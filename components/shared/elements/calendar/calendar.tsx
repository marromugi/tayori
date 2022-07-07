import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'shared/hooks/useTheme'
import { getMonthEngName, getMonthWeekList } from 'shared/utils/date'
import { moduler } from 'shared/utils/styles'
import { ColorBox } from '../box/color'
import { Box } from '../box/common'
import { FlexBox } from '../box/flex'
import { ScaleBox } from '../box/scale'
import { CursorBox } from '../box/cursor'
import { Image } from '../image/common'
import { Word } from '../text/common'
import { BorderBox } from '../box/border'
import { Input } from '../field/input'
import { NeumorphismBox } from '../box/neumorphism'
import { zeroPadding } from 'shared/utils/string'

const CALENDAR_CELL_SIZE = 34

export const Calendar = (props: {
  date: Date
  onChange: (d: Date) => void
}) => {
  const { theme } = useTheme()
  const [selected, setSelected] = useState<Date>(props.date)
  const [weeks, setWeeks] = useState<[Date[]]>(
    getMonthWeekList(props.date.getFullYear(), props.date.getMonth() + 1)
  )

  const onNext = () => {
    const nextWeeks = getMonthWeekList(
      weeks[0][0].getFullYear(),
      weeks[0][0].getMonth() + 1 + 1
    )
    setWeeks(nextWeeks)
  }

  const onPrev = () => {
    const prevWeeks = getMonthWeekList(
      weeks[0][0].getFullYear(),
      weeks[0][0].getMonth() + 1 - 1
    )
    setWeeks(prevWeeks)
  }

  const onSelect = (date: Date) => {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      selected.getHours(),
      selected.getMinutes()
    )
    setSelected(newDate)
  }

  const onTimeChange = (hour?: number, minute?: number) => {
    const newDate = new Date(
      selected.getFullYear(),
      selected.getMonth(),
      selected.getDate(),
      hour ?? selected.getHours(),
      minute ?? selected.getMinutes()
    )
    setSelected(newDate)
  }

  useEffect(() => {
    props.onChange(selected)
  }, [selected])

  // return <></>
  return (
    <NeumorphismBox
      background={theme.color.base}
      boxShadow={'5px 5px 10px #bfbfbf, -5px -5px 10px #ffffff'}
      radius={'16px'}
      padding={'1.5em 1em'}
    >
      <FlexBox way={'column'} gap={'1em'}>
        <FlexBox
          way={'row'}
          width={'100%'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <FlexBox way={'row'} gap={'0.5em'} alignItems={'center'}>
            <Word weight={'600'} size={moduler(0)}>
              {weeks[0][0].getFullYear()}
            </Word>
            <Word weight={'600'} size={moduler(0)}>
              {getMonthEngName(weeks[0][0])}
            </Word>
          </FlexBox>
          <FlexBox way={'row'} gap={'0.5em'}>
            <Box onClick={() => onPrev()}>
              <Image
                width={'20px'}
                height={'20px'}
                src={'/arrow-left.svg'}
                fit={'contain'}
              />
            </Box>
            <Box onClick={() => onNext()}>
              <Image
                width={'20px'}
                height={'20px'}
                src={'/arrow-right.svg'}
                fit={'contain'}
              />
            </Box>
          </FlexBox>
        </FlexBox>
        <FlexBox way={'column'} gap={'0.5em'}>
          <FlexBox way={'row'} gap={'0.5em'}>
            <CalendarWeekDayBox day={'Sun'} />
            <CalendarWeekDayBox day={'Mon'} />
            <CalendarWeekDayBox day={'Tue'} />
            <CalendarWeekDayBox day={'Wed'} />
            <CalendarWeekDayBox day={'Thr'} />
            <CalendarWeekDayBox day={'Fri'} />
            <CalendarWeekDayBox day={'Sat'} />
          </FlexBox>
          <FlexBox way={'column'} minHeight={`${CALENDAR_CELL_SIZE * 6}px`}>
            {weeks.map((week, i) => (
              <FlexBox
                key={i}
                way={'row'}
                gap={'0.5em'}
                width={'100%'}
                justifyContent={
                  i === weeks.length - 1 ? 'flex-start' : 'flex-end'
                }
              >
                {week.map((date) => (
                  <CalendarDateBox
                    key={date.getDate()}
                    date={date}
                    isSelected={
                      selected.getFullYear() === date.getFullYear() &&
                      selected.getMonth() === date.getMonth() &&
                      selected.getDate() === date.getDate()
                    }
                    onSelect={(d) => onSelect(d)}
                  />
                ))}
              </FlexBox>
            ))}
          </FlexBox>
        </FlexBox>
        <BorderBox
          width={'100%'}
          borderPosition={'top'}
          borderStyle={'solid'}
          borderColor={theme.color.main}
          borderWidth={'3px'}
          padding={'0.5em 0 0 0'}
        >
          <Timer date={props.date} onChange={(h, m) => onTimeChange(h, m)} />
        </BorderBox>
      </FlexBox>
    </NeumorphismBox>
  )
}

const Timer = (props: {
  date: Date
  onChange: (hour?: number, minute?: number) => void
}) => {
  // const hours = [...Array(24)]
  // const minites = [...Array(60)]
  const hourRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const minRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const allowKeys = ['ArrowLeft', 'ArrowRight', 'Backspace', 'Enter']
  const { theme } = useTheme()

  const onMinuteKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key
    // allow key 以外
    if (!allowKeys.includes(key)) {
      const value = `${e.currentTarget.value}${key}`

      // keyが数字でない
      if (isNaN(Number(key))) {
        e.preventDefault()
        return false
      }
      // 新しい数字が59を超えている
      if (Number(value) >= 60) {
        e.preventDefault()
        return false
      }
      // 数字が３桁以上
      if (value.length > 2) {
        e.preventDefault()
        return false
      }
    }

    // bs の場合、末尾１文字削除する
    const newMinute =
      key === 'Backspace'
        ? e.currentTarget.value.slice(0, -1)
        : allowKeys.includes(key)
        ? `${e.currentTarget.value}`
        : `${e.currentTarget.value}${key}`

    props.onChange(undefined, Number(newMinute))
  }

  const onHourKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key

    // allow key 以外
    if (!allowKeys.includes(key)) {
      const value = `${e.currentTarget.value}${key}`

      // keyが数字でない
      if (isNaN(Number(key))) {
        e.preventDefault()
        return false
      }
      // 新しい数字が23を超えている
      if (Number(value) >= 24) {
        e.preventDefault()
        return false
      }
      // 数字が３桁以上
      if (value.length > 2) {
        e.preventDefault()
        return false
      }
    }

    // bs の場合、末尾１文字削除する
    const newHour =
      key === 'Backspace'
        ? e.currentTarget.value.slice(0, -1)
        : allowKeys.includes(key)
        ? `${e.currentTarget.value}`
        : `${e.currentTarget.value}${key}`

    props.onChange(Number(newHour))
  }

  const onMinuteBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (
      Number(e.currentTarget.value) < 10 &&
      e.currentTarget.value.length < 2
    ) {
      minRef.current.value = `0${e.currentTarget.value}`
    }
    if (Number(e.currentTarget.value) === 0) {
      minRef.current.value = '00'
    }
  }

  const onHourBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (
      Number(e.currentTarget.value) < 10 &&
      e.currentTarget.value.length < 2
    ) {
      hourRef.current.value = `0${e.currentTarget.value}`
    }
    if (Number(e.currentTarget.value) === 0) {
      hourRef.current.value = '00'
    }
  }

  return (
    <Box width={'100%'}>
      <FlexBox
        way={'row'}
        width={'100%'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Image
          width={'40px'}
          height={'40px'}
          src={'/watch.svg'}
          fit={'contain'}
        />
        <FlexBox way={'row'} alignItems={'center'} gap={'0.25em'}>
          <CursorBox cursor={'pointer'} padding={'1em 0.25em'}>
            <Input
              ref={hourRef}
              width={'3ch'}
              font={{ weight: '600', size: moduler(0) }}
              align={'center'}
              defaultValue={zeroPadding(props.date.getHours(), 2).toString()}
              placeholder={'23'}
              onKeyDown={(e: any) => onHourKeydown(e)}
              onBlur={(e: any) => onHourBlur(e)}
            />
          </CursorBox>
          <Word weight={'600'} size={moduler(0)} color={theme.color.gray02}>
            :
          </Word>
          <CursorBox cursor={'pointer'} padding={'1em 0.25em'}>
            <Input
              ref={minRef}
              width={'3ch'}
              font={{ weight: '600', size: moduler(0) }}
              align={'center'}
              defaultValue={zeroPadding(props.date.getMinutes(), 2).toString()}
              placeholder={'59'}
              onKeyDown={(e: any) => {
                onMinuteKeydown(e)
              }}
              onBlur={(e: any) => onMinuteBlur(e)}
            />
          </CursorBox>
        </FlexBox>
      </FlexBox>
    </Box>
  )
}

// day-of-week
const CalendarWeekDayBox = (props: { day: string }) => {
  const { theme } = useTheme()
  return (
    <FlexBox
      way={'column'}
      width={`${CALENDAR_CELL_SIZE}px`}
      alignItems={'center'}
    >
      <Word weight={'600'} size={moduler(-2)} color={theme.color.gray02}>
        {props.day}
      </Word>
    </FlexBox>
  )
}

const CalendarDateBox = (props: {
  key: number,
  date: Date
  isSelected: boolean
  onSelect: (d: Date) => void
}) => {
  const { theme } = useTheme()
  return (
    <ScaleBox
      scale={props.isSelected ? 1.0 : 1.1}
      onClick={() => props.onSelect(props.date)}
    >
      <ColorBox
        width={`${CALENDAR_CELL_SIZE}px`}
        height={`${CALENDAR_CELL_SIZE}px`}
        radius={`${CALENDAR_CELL_SIZE / 2}px`}
        background={props.isSelected ? theme.color.main : 'transparent'}
        hover={{
          background: props.isSelected ? theme.color.main : theme.color.gray05
        }}
      >
        <FlexBox
          way={'column'}
          width={`${CALENDAR_CELL_SIZE}px`}
          height={`${CALENDAR_CELL_SIZE}px`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Word
            weight={'600'}
            size={moduler(-0.5)}
            color={props.isSelected ? theme.color.base : theme.color.main}
          >
            {props.date.getDate()}
          </Word>
        </FlexBox>
      </ColorBox>
    </ScaleBox>
  )
}
