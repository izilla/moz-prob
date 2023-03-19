import { getSourceDuplicates } from "../src/getSourceDuplicates";
import { Data } from "../src/getSourceDuplicates.d";

describe('getSourceDuplicates', () => {
  describe('bad data', () => {
    describe('empty object', () => {
      it('should return empty lists', () => {
        const testData = {}

        const results = getSourceDuplicates(testData)

        expect(results).not.toBeNull()
        expect(results.duplicate_domain_authorities.length).toBe(0)
        expect(results.duplicate_spam_scores.length).toBe(0)
      })
    })

  })
  describe('good data', () => {
    describe('no matches', () => {
      it('should return empty lists', () => {
        const testData: Data = {
          idina_response: {
            sources: [
              {
                url: 'abc.def',
                spam_score: 1,
                domain_authority: 3
              }
            ]
          }
        }

        const results = getSourceDuplicates(testData)

        expect(results).not.toBeNull()
        expect(results.duplicate_domain_authorities.length).toBe(0)
        expect(results.duplicate_spam_scores.length).toBe(0)
      })
    })

    describe('single spam_score match', () => {
      it('should return the matching urls', () => {
        const testData: Data = {
          idina_response: {
            sources: [
              {
                url: 'abc.def',
                spam_score: 1,
                domain_authority: 3
              },
              {
                url: 'abc.xyz',
                spam_score: 1,
                domain_authority: 2
              }
            ]
          }
        }

        const results = getSourceDuplicates(testData)

        expect(results).not.toBeNull()
        expect(results.duplicate_domain_authorities.length).toBe(0)
        expect(results.duplicate_spam_scores.length).toBe(2)
        expect(results.duplicate_spam_scores).toContain('abc.def')
        expect(results.duplicate_spam_scores).toContain('abc.xyz')
      })
    })

    describe('single domain_authority match', () => {
      it('should return the matching urls', () => {
        const testData: Data = {
          idina_response: {
            sources: [
              {
                url: 'abc.def',
                spam_score: 9,
                domain_authority: 2
              },
              {
                url: 'abc.xyz',
                spam_score: 1,
                domain_authority: 2
              }
            ]
          }
        }

        const results = getSourceDuplicates(testData)

        expect(results).not.toBeNull()
        expect(results.duplicate_domain_authorities.length).toBe(2)
        expect(results.duplicate_spam_scores.length).toBe(0)
        expect(results.duplicate_domain_authorities).toContain('abc.def')
        expect(results.duplicate_domain_authorities).toContain('abc.xyz')
      })
    })

    describe('matching spam_scores and domain_authorities', () => {
      it('should return the matching urls', () => {
        const testData: Data = {
          idina_response: {
            sources: [
              {
                url: 'abc.def',
                spam_score: 9,
                domain_authority: 2
              },
              {
                url: 'abc.xyz',
                spam_score: 1,
                domain_authority: 2
              },
              {
                url: 'foo.bar',
                spam_score: 1,
                domain_authority: 3
              }
            ]
          }
        }

        const results = getSourceDuplicates(testData)

        expect(results).not.toBeNull()
        expect(results.duplicate_domain_authorities.length).toBe(2)
        expect(results.duplicate_spam_scores.length).toBe(2)
        expect(results.duplicate_domain_authorities).toContain('abc.def')
        expect(results.duplicate_domain_authorities).toContain('abc.xyz')
        expect(results.duplicate_spam_scores).toContain('abc.xyz')
        expect(results.duplicate_spam_scores).toContain('foo.bar')
      })

      it('should not contain non-duplicate urls', () => {
        const testData: Data = {
          idina_response: {
            sources: [
              {
                url: 'abc.def',
                spam_score: 9,
                domain_authority: 2
              },
              {
                url: 'abc.xyz',
                spam_score: 1,
                domain_authority: 2
              },
              {
                url: 'foo.bar',
                spam_score: 1,
                domain_authority: 3
              },
              {
                url: 'should.not.return',
                spam_score: 3,
                domain_authority: 8
              },
            ]
          }
        }

        const results = getSourceDuplicates(testData)

        expect(results).not.toBeNull()
        expect(results.duplicate_domain_authorities.length).toBe(2)
        expect(results.duplicate_spam_scores.length).toBe(2)
        expect(results.duplicate_domain_authorities).toContain('abc.def')
        expect(results.duplicate_domain_authorities).toContain('abc.xyz')
        expect(results.duplicate_spam_scores).toContain('abc.xyz')
        expect(results.duplicate_spam_scores).toContain('foo.bar')
      })
    })
  })
})