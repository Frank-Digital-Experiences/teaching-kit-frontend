import axios from 'axios'
import { Lecture, LectureTwoLevelsDeep } from '../../../types'
import { ResponseArray, ResponseArrayData } from '../types'
import { FilterParameters, getAuthorsAndKeywordsFilterString } from '../utils'

const ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/lectures`
const DEFAULT_MATCHES_PER_PAGE = 10

export const getLectures = async () => {
  const response: ResponseArray<Lecture> = await axios.get(ENDPOINT)
  return response.data.data
}

const getPopulateString = () => {
  const populateLectureCreator = 'populate[LectureCreator]=*'
  const populateBlockAuthors = 'populate[Blocks][populate][Authors]=*'
  const populateKeywords = 'populate[Blocks][populate][Keywords]=*'
  return `${populateKeywords}&${populateBlockAuthors}&${populateLectureCreator}`
}

export const filterLectureOnKeywordsAndAuthors = async ({
  keywords,
  authors,
  pageNumber,
  matchesPerPage,
}: FilterParameters): Promise<ResponseArrayData<LectureTwoLevelsDeep>> => {
  const pagination = `?pagination[page]=${pageNumber}&pagination[pageSize]=${
    matchesPerPage ?? DEFAULT_MATCHES_PER_PAGE
  }`

  const authorsAndKeywordsFilterString = getAuthorsAndKeywordsFilterString(
    authors,
    keywords,
    'LECTURE'
  )

  const populate = getPopulateString()

  const filters = `${pagination}${authorsAndKeywordsFilterString}`
  const filterString =
    filters.length > 0 ? `${filters}&${populate}` : `?${populate}`
  const response: ResponseArray<LectureTwoLevelsDeep> = await axios.get(
    `${ENDPOINT}${filterString}`
  )
  return response.data
}
