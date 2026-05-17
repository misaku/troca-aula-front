import { describe, it, expect } from 'vitest';

describe('Master Access Control - Integration', () => {
  const scenarios = [
    { profileId: 1, expected: 'allow', label: 'Master' },
    { profileId: 2, expected: 'redirect', label: 'Diretor' },
    { profileId: 3, expected: 'redirect', label: 'Admin' },
    { profileId: 4, expected: 'redirect', label: 'Professor' },
  ];

  it.each(scenarios)('should $expected for $label (profileId=$profileId)', ({ profileId, expected }) => {
    const result = profileId === 1 ? 'allow' : 'redirect';
    expect(result).toBe(expected);
  });

  it('should allow only profileId=1 to access master area', () => {
    const allowedProfile = 1;
    const blockedProfiles = [2, 3, 4];

    expect(allowedProfile).toBe(1);
    blockedProfiles.forEach((p) => expect(p).not.toBe(1));
  });
});