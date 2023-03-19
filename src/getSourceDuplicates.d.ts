type SourceUrl = {
  url?: string
  page_authority?: number
}

type Source = {
  url: string
  spam_score?: number
  matching_target_indexes?: number[]
  matching_source_urls?: SourceUrl[]
  domain_authority?: number
}

export type Data = {
  idina_response?: {
    sources: Source[]
  }
}