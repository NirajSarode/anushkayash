export interface BlessingRecord {
  id: string;
  name: string;
  relation: string;
  message: string;
  date: string;
  side: 'bride' | 'groom' | 'mutual';
  likes?: number;
}

export type Blessing = BlessingRecord;

export const STORAGE_KEY = 'anushkayash_blessings';
export const LIKES_KEY = 'anushkayash_liked_blessings';

export const sideColors = {
  bride: '#8E0E16',
  groom: '#9A6C20',
  mutual: '#D4AF37',
} as const;

export const sideLabels = {
  bride: "Bride's Side",
  groom: "Groom's Side",
  mutual: 'Both / Friends',
} as const;

const DEMO_IDS = new Set(['1', '2', '3']);
const DEMO_NAMES = new Set([
  'G K & Rajni Verma',
  'Jugalkishor & Meena Biyani',
  'Rohan, Simran & Friends',
]);

export function isDemoBlessing(b: { id?: string; name?: string }): boolean {
  if (!b) return false;
  if (b.id && DEMO_IDS.has(String(b.id))) return true;
  if (b.name && DEMO_NAMES.has(String(b.name))) return true;
  return false;
}

/**
 * Google Sheet API Endpoint Configuration.
 * Connected Google Apps Script Web App for Anushka & Yash wedding wishes.
 */
export const GOOGLE_SHEET_API_URL =
  import.meta.env.VITE_GOOGLE_SHEET_API_URL ||
  'https://script.google.com/macros/s/AKfycbyDOQrgkZZKQxLxvyEI00I7n2kXP1oAqoeJ1jSdqRCHVb0dIotb89B7pOrsq3d-K32g/exec';

export function getSheetApiUrl(): string {
  return GOOGLE_SHEET_API_URL.trim();
}

function formatBlessingDate(rawDate?: unknown): string {
  if (!rawDate) return 'Recently';
  const str = String(rawDate).trim();
  if (!str) return 'Recently';
  if (/^[A-Za-z]{3}\s+\d{1,2},\s+\d{4}/.test(str)) return str;
  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
  return str;
}

/**
 * Fetch blessings from the Google Sheet (via Apps Script, SheetDB, or Sheet.best).
 */
export async function fetchBlessingsFromSheet(): Promise<BlessingRecord[] | null> {
  const url = getSheetApiUrl();
  if (!url) return null;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();

    if (Array.isArray(data)) {
      return data.map((item: Record<string, unknown>, idx: number) => ({
        id: String(item.id || item.ID || `sheet-${idx}-${Date.now()}`),
        name: String(item.name || item.Name || 'Well Wisher'),
        relation: String(item.relation || item.Relation || 'Family & Friends'),
        message: String(item.message || item.Message || ''),
        date: formatBlessingDate(item.date || item.Date || item.timestamp || item.Timestamp),
        side: (item.side === 'bride' || item.side === 'groom' ? item.side : 'mutual') as 'bride' | 'groom' | 'mutual',
        likes: typeof item.likes === 'number' ? item.likes : 1,
      }));
    }
  } catch (err) {
    console.warn('Could not fetch blessings from Google Sheet. Falling back to local cache.', err);
  }
  return null;
}

/**
 * Send a blessing to Google Sheet.
 * Works seamlessly with Google Apps Script Web App, SheetDB, or Sheet.best.
 */
export async function postBlessingToSheet(blessing: BlessingRecord): Promise<boolean> {
  const url = getSheetApiUrl();
  if (!url) return false;

  try {
    const payload = {
      timestamp: new Date().toISOString(),
      date: blessing.date,
      name: blessing.name,
      relation: blessing.relation,
      side: blessing.side,
      message: blessing.message,
      likes: blessing.likes || 1,
    };

    // If using Google Apps Script Web App (script.google.com), text/plain or URLSearchParams avoids preflight/redirect issues
    if (url.includes('script.google.com')) {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });
      return true;
    }

    // SheetDB or Sheet.best or custom API
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: [payload] }),
    });

    return res.ok;
  } catch (err) {
    console.warn('Error sending blessing to Google Sheet:', err);
    return false;
  }
}
