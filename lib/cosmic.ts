import { createBucketClient } from '@cosmicjs/sdk';
import type { MacroTopico, AreaInterface } from '@/types';

// Default read/write client (used as a safe fallback; prefer passing the
// client returned by getCosmic() from pages so preview mode works correctly)
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

type CosmicClient = typeof cosmic;

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Safely extracts a plain string value from a metadata field, even if the
// Cosmic API returns a legacy object shape like { key, value } instead of a
// plain string.
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

export function getNumero(topico: MacroTopico): number {
  const n = topico.metadata?.numero;
  if (typeof n === 'number') return n;
  if (typeof n === 'string') {
    const parsed = parseInt(n, 10);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

export function formatNumero(n: number): string {
  return n.toString().padStart(2, '0');
}

export async function getAllMacroTopicos(
  client: CosmicClient = cosmic,
  preview = false
): Promise<MacroTopico[]> {
  try {
    const query = client.objects
      .find({ type: 'macro-topicos' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);

    const response = preview ? await query.status('any') : await query;
    const topicos = response.objects as MacroTopico[];

    return [...topicos].sort((a, b) => getNumero(a) - getNumero(b));
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Falha ao buscar macro-tópicos');
  }
}

export async function getMacroTopicoBySlug(
  slug: string,
  client: CosmicClient = cosmic,
  preview = false
): Promise<MacroTopico | null> {
  try {
    const query = client.objects
      .findOne({ type: 'macro-topicos', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);

    const response = preview ? await query.status('any') : await query;
    return (response.object as MacroTopico) ?? null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Falha ao buscar o macro-tópico');
  }
}

export async function getAdjacentMacroTopicos(
  numero: number,
  client: CosmicClient = cosmic,
  preview = false
): Promise<{ prev: MacroTopico | null; next: MacroTopico | null }> {
  const all = await getAllMacroTopicos(client, preview);
  const index = all.findIndex((t) => getNumero(t) === numero);

  if (index === -1) {
    return { prev: null, next: null };
  }

  const prev = index > 0 ? all[index - 1] : null;
  const next = index < all.length - 1 ? all[index + 1] : null;

  return { prev: prev ?? null, next: next ?? null };
}

export async function getAllAreasInterface(
  client: CosmicClient = cosmic,
  preview = false
): Promise<AreaInterface[]> {
  try {
    const query = client.objects
      .find({ type: 'areas-interface' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);

    const response = preview ? await query.status('any') : await query;
    const areas = response.objects as AreaInterface[];

    return [...areas].sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Falha ao buscar áreas de interface');
  }
}

export async function getAreaInterfaceBySlug(
  slug: string,
  client: CosmicClient = cosmic,
  preview = false
): Promise<AreaInterface | null> {
  try {
    const query = client.objects
      .findOne({ type: 'areas-interface', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);

    const response = preview ? await query.status('any') : await query;
    return (response.object as AreaInterface) ?? null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Falha ao buscar a área de interface');
  }
}

export async function getMacroTopicosByArea(
  areaId: string,
  client: CosmicClient = cosmic,
  preview = false
): Promise<MacroTopico[]> {
  try {
    const query = client.objects
      .find({ type: 'macro-topicos', 'metadata.areas_interface': areaId })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);

    const response = preview ? await query.status('any') : await query;
    const topicos = response.objects as MacroTopico[];

    return [...topicos].sort((a, b) => getNumero(a) - getNumero(b));
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Falha ao buscar macro-tópicos da área');
  }
}