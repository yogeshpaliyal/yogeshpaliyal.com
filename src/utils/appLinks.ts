/**
 * Play Store link tagged with an install referrer, so installs from the
 * website show up under "Acquisition" in Play Console.
 */
export function playStoreUrl(packageId: string, campaign: string) {
  const referrer = new URLSearchParams({
    utm_source: "yogeshpaliyal.com",
    utm_medium: "app_page",
    utm_campaign: campaign,
  }).toString();
  return `https://play.google.com/store/apps/details?id=${packageId}&referrer=${encodeURIComponent(referrer)}`;
}
