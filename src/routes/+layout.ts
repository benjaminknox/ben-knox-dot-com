import posthog from 'posthog-js';
import { browser } from '$app/environment';

export const load = async () => {
  if (browser) {
    posthog.init(
      'phc_gYcgSwoPcq2oz7F9Byq7N4pVCPS1WsfMKuqXplmoDVs',
      {
        api_host: '/relay-oDVs',
        defaults: '2025-05-24',
        person_profiles: 'identified_only',
      }
    )
  }

  return
};
