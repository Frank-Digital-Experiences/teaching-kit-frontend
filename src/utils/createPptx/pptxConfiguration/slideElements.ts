import PptxGenJS from 'pptxgenjs'
import { IMAGE_MARGIN_LEFT, IMAGE_WIDTH } from './image'
import {
  remainingWidth,
  toPercentage,
  startXPos,
  X_PADDING,
  startYPos,
  Y_PADDING,
  remainingHeight,
} from './utils'
import {
  CONTENT_HEIGHT,
  PRIMARY_CONTENT_WIDTH,
  ESTIMATED_SLIDE_TITLE_HEIGHT,
} from './mainContent'

export const CITE_AS_Y_MARGIN = 5

const SLIDE_HEADING_WIDTH = remainingWidth(
  2 * X_PADDING + IMAGE_WIDTH + IMAGE_MARGIN_LEFT
)

export const getSlideHeadingWidth = (slideContainsImage: boolean) => {
  return slideContainsImage
    ? remainingWidth(2 * X_PADDING + IMAGE_WIDTH + IMAGE_MARGIN_LEFT)
    : remainingWidth(2 * X_PADDING)
}

export const getSlideHeading = (
  slideContainsImage: boolean
): PptxGenJS.TextPropsOptions => {
  const headingWidth = getSlideHeadingWidth(slideContainsImage)
  return {
    ...slideHeading,
    w: toPercentage(headingWidth),
  }
}

const slideHeading: PptxGenJS.TextPropsOptions = {
  x: startXPos,
  y: startYPos,
  fontSize: 36,
  w: toPercentage(SLIDE_HEADING_WIDTH),
  h: 0.75,
  breakLine: true,
}

export const h1Heading: PptxGenJS.TextPropsOptions = {
  x: 0.5,
  y: 0,
  fontSize: 24,
  w: '90%',
  h: 0.75,
  autoFit: true,
}

export const h2Heading: PptxGenJS.TextPropsOptions = {
  x: 0.5,
  y: 0,
  fontSize: 22,
  w: '90%',
  h: 0.75,
  autoFit: true,
}

export const h3Heading: PptxGenJS.TextPropsOptions = {
  x: 0.5,
  y: 0,
  fontSize: 20,
  w: '90%',
  h: 0.75,
  autoFit: true,
}

export const citeAsStyling: PptxGenJS.TextPropsOptions = {
  x: startXPos,
  y: toPercentage(
    Y_PADDING + CONTENT_HEIGHT + ESTIMATED_SLIDE_TITLE_HEIGHT + CITE_AS_Y_MARGIN
  ),
  fontSize: 9,
  w: toPercentage(PRIMARY_CONTENT_WIDTH),
  h: toPercentage(
    remainingHeight(
      Y_PADDING +
        CONTENT_HEIGHT +
        ESTIMATED_SLIDE_TITLE_HEIGHT +
        CITE_AS_Y_MARGIN * 2
    )
  ),
}

export const descriptionSlideAuthor: PptxGenJS.TextPropsOptions = {
  x: startXPos,
  y: 6.5,
  w: 5.5,
  h: 0.75,
}

export const descriptionTitle: PptxGenJS.TextPropsOptions = {
  x: startXPos,
  y: startYPos,
  fontSize: 36,
  w: toPercentage(remainingWidth(2 * X_PADDING)),
  h: 0.75,
  breakLine: true,
}

export const descriptionSlideRec: any = {
  x: 0.0,
  y: 6.5,
  w: '100%',
  h: 0.75,
  fill: { color: 'F1F1F1' },
}
