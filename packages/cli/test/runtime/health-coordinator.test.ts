import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import YAML from 'yaml';
import { describe, expect, it } from 'vitest';
import { catalogFor, proofOutcomeHealthStatus } from '../../src/runtime/health-coordinator.js';
import type { GlobalOwnershipManifest } from '../../src/runtime/composed-installer.js';

const sourceRoot = path.resolve(import.meta.dirname, '../../../..');

describe('proof outcome health', () => {
  it('does not report reducer-only proof behavior as live healthy', () => {
    expect(proofOutcomeHealthStatus(false)).toBe('BROKEN');
    expect(proofOutcomeHealthStatus(true)).toBe('DEGRADED');
  });

  it('separates canonical, global base, task projection, collisions and host-owned extras', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'agent-rules-health-catalog-'));
    const fixtureSource = path.join(root, 'fixture-source');
    fs.cpSync(path.join(sourceRoot, 'registry'), path.join(fixtureSource, 'registry'), { recursive: true });
    fs.cpSync(path.join(sourceRoot, 'skills'), path.join(fixtureSource, 'skills'), { recursive: true });
    fs.cpSync(path.join(sourceRoot, 'profiles'), path.join(fixtureSource, 'profiles'), { recursive: true });
    fs.mkdirSync(path.join(fixtureSource, 'skills', 'fixture-explicit'), { recursive: true });
    fs.writeFileSync(path.join(fixtureSource, 'skills', 'fixture-explicit', 'SKILL.md'), '---\nname: fixture-explicit\ndescription: fixture explicit\n---\n# fixture-explicit\n');
    const regPath = path.join(fixtureSource, 'registry', 'skills.yaml');
    const parsedReg = YAML.parse(fs.readFileSync(regPath, 'utf8'));
    parsedReg.skills.push({ id: 'fixture-explicit', origin: 'internal', role: 'process', activation: 'explicit-only', compatibility: {}, lifecycle: 'active', trust_tier: 'owner-approved', trust_basis: 'test fixture', network: 'none', side_effects: [], update_policy: 'manual_review', failure_target: 'fixture failure target', removal_condition: 'fixture removal condition' });
    fs.writeFileSync(regPath, YAML.stringify(parsedReg));

    const globalRoot = path.join(root, 'global-skills');
    const taskRoot = path.join(root, 'repository');
    const taskSkillRoot = path.join(taskRoot, '.agents', 'skills');
    fs.mkdirSync(globalRoot, { recursive: true });
    const registry = YAML.parse(fs.readFileSync(path.join(sourceRoot, 'registry', 'skills.yaml'), 'utf8')) as { skills: Array<{ id: string; lifecycle: string; activation: string }> };
    const implicit = registry.skills.filter((entry) => entry.lifecycle === 'active' && entry.activation === 'implicit').map((entry) => entry.id);
    const profileId = '5fedu-project';
    for (const id of implicit) fs.cpSync(path.join(sourceRoot, 'skills', id), path.join(globalRoot, id), { recursive: true });
    fs.cpSync(path.join(sourceRoot, 'profiles', '5fedu', 'skills', profileId), path.join(globalRoot, profileId), { recursive: true });
    fs.mkdirSync(path.join(globalRoot, 'host-native'), { recursive: true });
    fs.writeFileSync(path.join(globalRoot, 'host-native', 'SKILL.md'), '---\nname: host-native\ndescription: host owned\n---\n');
    fs.mkdirSync(taskSkillRoot, { recursive: true });
    fs.cpSync(path.join(fixtureSource, 'skills', 'fixture-explicit'), path.join(taskSkillRoot, 'fixture-explicit'), { recursive: true });
    fs.mkdirSync(path.join(taskRoot, '.agent', 'current'), { recursive: true });
    fs.writeFileSync(path.join(taskRoot, '.agent', 'current', 'state.json'), JSON.stringify({
      selected_skill_ids: ['verification-router', 'fixture-explicit'],
      projected_skill_ids: ['fixture-explicit'],
      skill_projection: { host: 'codex', target_root: taskSkillRoot, status: 'ACTIVE', reused_skill_ids: [] },
    }));
    const projections = Object.fromEntries([...implicit, profileId].map((id) => [`cursor:${id}`, { platform: 'cursor', path: path.join(globalRoot, id), kind: 'skill' as const, sha256: 'a'.repeat(64) }]));
    const ownership: GlobalOwnershipManifest = { schema: 'agent-rules/global-ownership-manifest/v1', version: 1, updatedAt: new Date().toISOString(), candidateSha256: 'b'.repeat(64), projections };
    const catalog = await catalogFor('codex', fixtureSource, taskRoot, undefined, { globalSkillRoot: globalRoot, ownershipManifest: ownership });
    expect(catalog.canonical_library_valid).toBe(true);
    expect(catalog.global_base_valid).toBe(true);
    expect(catalog.global_agent_rules_owned_ids).toEqual(expect.arrayContaining(implicit));
    expect(catalog.global_profile_ids).toEqual([profileId]);
    expect(catalog.host_native_or_user_owned_ids).toEqual(['host-native']);
    expect(catalog.user_owned_collision_ids).toEqual([]);
    expect(catalog.task_observed_ids).toEqual(['fixture-explicit']);
    expect(catalog.task_projection_valid).toBe(true);
    expect(catalog.task_selected_addition_chars).toBeGreaterThan(0);
    expect(catalog.agent_rules_effective_chars).toBe(catalog.base_discovery_chars + catalog.profile_addition_chars + catalog.task_selected_addition_chars);
    expect(catalog.host_observed_total_chars).toBeGreaterThan(catalog.agent_rules_effective_chars);

    const collisionOwnership: GlobalOwnershipManifest = { ...ownership, projections: Object.fromEntries(Object.entries(projections).filter(([, projection]) => path.basename(projection.path) !== 'docs-style')) };
    const collision = await catalogFor('codex', fixtureSource, taskRoot, undefined, { globalSkillRoot: globalRoot, ownershipManifest: collisionOwnership });
    expect(collision.global_base_valid).toBe(false);
    expect(collision.user_owned_collision_ids).toContain('docs-style');
  });
});
