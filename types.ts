export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface AreaInterface extends CosmicObject {
  type: 'areas-interface';
  metadata: {
    descricao?: string;
    cor?: string;
  };
}

export interface MacroTopico extends CosmicObject {
  type: 'macro-topicos';
  metadata: {
    numero?: number;
    resumo?: string;
    conteudo?: string;
    areas_interface?: AreaInterface[];
    imagem?: {
      url: string;
      imgix_url: string;
    };
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

export function isMacroTopico(obj: CosmicObject): obj is MacroTopico {
  return obj.type === 'macro-topicos';
}

export function isAreaInterface(obj: CosmicObject): obj is AreaInterface {
  return obj.type === 'areas-interface';
}