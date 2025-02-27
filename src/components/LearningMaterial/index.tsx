import React from 'react'
import {
  LearningMaterialType,
  LearningOutcome,
  Prerequisite,
} from '../../types'
import AccordionGroup from '../AccordionGroup/AccordionGroup'
import UnorderedList, { Content } from './UnorderedList/UnorderedList'

import * as Styled from './styles'
import { formatDate, typeToText } from '../../utils/utils'
import LearningMaterialBadge from './LearningMaterialBadge/LearningMaterialBadge'
import Markdown from '../Markdown/Markdown'

export type Props = {
  type: LearningMaterialType
  title: string
  abstract: string
  learningOutcomes?: LearningOutcome[]
  prerequisites?: Prerequisite[]
  acknowledgement?: string
  citeAs?: string
  publishedAt?: string
  updatedAt?: string
}

export default function LearningMaterial({
  type,
  title,
  abstract,
  learningOutcomes,
  prerequisites,
  acknowledgement,
  citeAs,
  publishedAt,
  updatedAt,
}: Props) {
  const updatedText = updatedAt ? `Updated at ${formatDate(updatedAt)} ` : ''
  const createdText = publishedAt ? `Created at ${formatDate(publishedAt)}` : ''
  const getUnorderedListAccordion = (label: string, listItems?: Content[]) => {
    return listItems !== undefined
      ? [{ label, content: <UnorderedList listOfContent={listItems} /> }]
      : []
  }

  const getStringAccordion = (label: string, content?: string) => {
    return content !== undefined
      ? [
          {
            label,
            content: <p>{content}</p>,
          },
        ]
      : []
  }

  const getAccordions = (
    learningOutcomes?: LearningOutcome[],
    prerequisites?: Prerequisite[],
    acknowledgement?: string,
    citeAs?: string
  ) => {
    const learningOutComesListItems = learningOutcomes?.map(
      (learningOutcome) => ({
        id: learningOutcome.id,
        listItem: learningOutcome.LearningOutcome,
      })
    )

    const prerequisitesListItems = prerequisites?.map((prerequisite) => ({
      id: prerequisite.id,
      listItem: prerequisite.Prerequisite,
    }))
    return [
      ...getUnorderedListAccordion(
        'Learning outcomes',
        learningOutComesListItems
      ),
      ...getUnorderedListAccordion('Prerequisites', prerequisitesListItems),
      ...getStringAccordion('Acknowledgement', acknowledgement),
      ...getStringAccordion('Cite as', citeAs),
    ]
  }

  return (
    <Styled.Wrapper>
      <LearningMaterialBadge type={type} elementType='h4' />
      <Styled.H1>{title}</Styled.H1>
      <Styled.H2>{`${typeToText(type)} description`}</Styled.H2>
      <Markdown>{abstract}</Markdown>
      <Styled.DateInformation>
        {`${updatedText}${createdText}`}
      </Styled.DateInformation>
      {learningOutcomes && learningOutcomes.length > 0 && (
        <AccordionGroup
          accordions={getAccordions(
            learningOutcomes,
            prerequisites,
            acknowledgement,
            citeAs
          )}
        />
      )}
    </Styled.Wrapper>
  )
}
