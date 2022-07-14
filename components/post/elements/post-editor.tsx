import { Post } from 'post/types/post'
import { BorderBox } from 'shared/elements/box/border'
import { ColorBox } from 'shared/elements/box/color'
import { Area } from 'shared/elements/field/area'
import { useTheme } from 'shared/hooks/useTheme'
import { moduler } from 'shared/utils/styles'
import styled from 'styled-components'
import { TransformBox } from 'shared/elements/box/transform'
import { useEffect, useRef, useState, MutableRefObject } from 'react'
import { usePostEditor } from 'post/hooks/usePostEditor'
import { PostMarkdown } from './post-markdown'
import { Box } from 'shared/elements/box/common'

export const PostEditor = (props: { post: Post; isPreview: boolean }) => {
  const { isPreview, uploadInfo, onInsertImgMarkdown } = usePostEditor()
  const { theme } = useTheme()
  const areaLeavePos = useRef(0)
  const [, setMarkdown] = useState(props.post.markdown ?? '')
  const areaRef = useRef() as MutableRefObject<HTMLTextAreaElement>

  useEffect(() => {
    setMarkdown(props.post.markdown ?? '')
  }, [isPreview])

  useEffect(() => {
    if (!props.post.markdown) return
    const newMarkdown = onInsertImgMarkdown(
      props.post.markdown,
      areaRef.current,
      areaLeavePos.current
    )
    props.post.markdown = newMarkdown
    setMarkdown(props.post.markdown)
  }, [uploadInfo])

  return (
    <PostEditorBox background={theme.color.gray06}>
      <BorderBox
        width={'100%'}
        height={'100%'}
        borderPosition={'all'}
        borderColor={theme.color.gray05}
        borderWidth={'2px'}
        borderStyle={'solid'}
        radius={'12px'}
        overflow={'hidden'}
      >
        <ColorBox
          width={'100%'}
          height={'100%'}
          background={theme.color.base}
          position={'relative'}
        >
          <ColorBox
            width={'100%'}
            height={'100%'}
            padding={'0 4em'}
            position={'absolute'}
            opacity={isPreview ? 1 : 0}
            overflowY={isPreview ? 'scroll' : 'hidden'}
          >
            <TransformBox
              width={'100%'}
              height={'100%'}
              transform={isPreview ? 'translateY(0)' : 'translateY(1em)'}
            >
              <Box width={'100%'} padding={'2em 0 0 0'}>
                <PostMarkdown post={props.post} />
              </Box>
            </TransformBox>
          </ColorBox>
          <ColorBox
            width={'100%'}
            height={'100%'}
            padding={'0 4em'}
            position={'absolute'}
            opacity={isPreview ? 0 : 1}
            overflowY={isPreview ? 'hidden' : 'scroll'}
          >
            <TransformBox
              width={'100%'}
              height={'100%'}
              transform={isPreview ? 'translateY(1em)' : 'translateY(0)'}
            >
              <Area
                width={'100%'}
                height={'100%'}
                font={{ size: moduler(-0.5) }}
                padding={'2em 0 0 0'}
                v_space={'2em'}
                h_space={'0.02em'}
                defaultValue={props.post.markdown ?? ''}
                onBlur={(e) =>
                  (areaLeavePos.current = e.currentTarget.selectionEnd)
                }
                onChange={(e) => (props.post.markdown = e.target.value)}
                ref={areaRef}
              />
            </TransformBox>
          </ColorBox>
        </ColorBox>
      </BorderBox>
    </PostEditorBox>
  )
}

const PostEditorBox = styled.div<{ background: string }>`
  width: 100%;
  height: 100%;
  padding: 2em;
  min-width: 40vw;
  border-radius: 15px;
  background: ${(props) => props.background};
  // border: solid 3px #131315;
`
