import type { Data } from './getSourceDuplicates.d'

type SourceDuplicates = {
  duplicate_spam_scores: string[]
  duplicate_domain_authorities: string[]
}

/**
 * Gets all urls that have duplicate `spam_score` and `domain_authority` for
 * the input data
 * 
 * @param data The data that is to be processes
 * @returns An object `{ "duplicate_spam_scores": [], "duplicate_domain_authorities": [] }`
 */
export const getSourceDuplicates = (data: Data): SourceDuplicates => {
  const sources = data?.idina_response?.sources
  let spamScoresSeen: Record<number, string> = {}
  let domainAuthoritiesSeen: Record<number, string> = {}
  let duplicateSpamScores: Set<string> = new Set<string>();
  let duplicateDomainAuthorities: Set<string> = new Set<string>()

  if (Array.isArray(sources)) {
    sources.forEach(source => {
      if (source?.spam_score) {
        if (spamScoresSeen[source?.spam_score]) {
          duplicateSpamScores.add(source.url)
          duplicateSpamScores.add(spamScoresSeen[source?.spam_score])
        } else {
          spamScoresSeen[source?.spam_score] = source.url
        }
      }

      if (source?.domain_authority) {
        if (domainAuthoritiesSeen[source?.domain_authority]) {
          duplicateDomainAuthorities.add(source?.url)
          duplicateDomainAuthorities.add(domainAuthoritiesSeen[source?.domain_authority])
        } else {
          domainAuthoritiesSeen[source?.domain_authority] = source.url
        }
      }
    })
  }

  return {
    duplicate_spam_scores: Array.from(duplicateSpamScores),
    duplicate_domain_authorities: Array.from(duplicateDomainAuthorities)
  }
}
