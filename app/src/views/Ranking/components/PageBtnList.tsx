import styled  from 'styled-components'
import { useMemo, useState } from 'react'

const PageButtonList = styled.div`
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  & > div {
    flex: 1
  }
`

const ButtonList = styled.div`
  display: flex;
  justify-content: center;
  & > div {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.85);
    background: transparent;
    margin: 0 4px;
    cursor: pointer;
    &.active {
      color: #fff;
      background: #4263eb;
    }
  }
  
`

const ToPageWrapper = styled.div`
  display: flex;
  justify-content: right;
  & > input {
    width: 44px;
    height: 22px;
    border: 1px solid #444444;
    border-radius: 4px;
    text-align: center;
  }
`

const GoBtn = styled.div`
  cursor: pointer;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  width: 24px;
  height: 22px;
  border-radius: 4px;
  color: rgba(0,0,0,0.85);
  background: transparent;
  margin: 0 8px;
  transition: all 0.4s;
  :hover {
    color: #fff;
    background: #4263eb;
  }
`

const StyledEllipsis = styled.span`
  display: block;
  font-family: 'Arial';
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  height: 24px;
    line-height: 16px;
  text-align: center;
  letter-spacing: 2px;
  color: rgba(0, 0, 0, 0.25);
  text-align: center;
`

const LeftBtn = styled.span`
  cursor: pointer;
  margin-right: 12px;
  font-size: 12px;
  transition: all 0.4s;
  color: #d6d6d6;
  display: block;
  line-height: 22px;
  :hover {
    color: #000;
  }
`

const RightBtn = styled(LeftBtn)`
  margin-right: 0px;
  margin-left: 12px;
`

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export default function PageBtnList({page, currentPage, setCurrentPage}) {
  const [inputValue, setValue] = useState('')

  const buttonList = useMemo(() => {
    if (!page) return null

    const maxPage = 2
    const push = []

    if (page < maxPage * 2 + 3) {
      for (let i = 0; i < page; i++) {
        push.push(i + 1)
      }
      return (
          <>
            {
              push.map((item) => (
                  <div
                      role="button"
                      tabIndex={0}
                      key={item}
                      className={currentPage === item ? 'active' : ''}
                      onClick={() => {
                        setCurrentPage(item)
                      }}
                      onKeyDown={() => {
                        setCurrentPage(item)
                      }}
                  >{item}</div>
              ))
            }
          </>
      )
    }
    if (currentPage <= 2 + maxPage) {
        for (let i = 0; i < currentPage + maxPage; i++) {
          push.push(i + 1)
        }
        return (
            <>
              {
                push.map((item, i) => (
                    <div
                        role="button"
                        tabIndex={0}
                        key={item}
                        className={currentPage === item ? 'active' : ''}
                        onClick={() => {
                          setCurrentPage(item)
                        }}
                        onKeyDown={() => {
                          setCurrentPage(item)
                        }}
                    >{item}</div>
                ))
              }
              <StyledEllipsis>...</StyledEllipsis>
              <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setCurrentPage(page)
                  }}
                  onKeyDown={() => {
                    setCurrentPage(page)
                  }}
              >{page}</div>
            </>
        )
      }
    if (currentPage + maxPage >= page) {
        for (let i = currentPage - (1 + maxPage); i < page; i++) {
          push.push(i + 1)
        }
        return (
            <>
              <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {setCurrentPage(1)}}
                  onKeyDown={() => {
                    setCurrentPage(1)
                  }}
              >{1}</div>
              <StyledEllipsis>...</StyledEllipsis>
              {
                push.map((item, i) => (
                    <div
                        role="button"
                        tabIndex={0}
                        key={item}
                        className={currentPage === item ? 'active' : ''}
                        onClick={() => {
                          setCurrentPage(item)
                        }}
                        onKeyDown={() => {
                          setCurrentPage(item)
                        }}
                    >{item}</div>
                ))
              }
            </>
        )
      }

    for (let i = currentPage - maxPage - 1; i < currentPage + maxPage; i++) {
      push.push(i + 1)
    }

    return (
        <>
          <div
              role="button"
              tabIndex={0}
              onClick={() => {setCurrentPage(1)}}
              onKeyDown={() => {
                setCurrentPage(1)
              }}
          >{1}</div>
          <StyledEllipsis>...</StyledEllipsis>
          {
            push.map((item) => (
                <div
                    role="button"
                    tabIndex={0}
                    key={item}
                    className={currentPage === item ? 'active' : ''}
                    onClick={() => {
                      setCurrentPage(item)
                    }}
                    onKeyDown={() => {
                      setCurrentPage(item)
                    }}
                >{item}</div>
            ))
          }
          <StyledEllipsis>...</StyledEllipsis>
          <div
              role="button"
              tabIndex={0}
              onClick={() => {setCurrentPage(page)}}
              onKeyDown={() => {
                setCurrentPage(page)
              }}
          >{page}</div>
        </>
    )

  }, [currentPage, page])

  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      setValue(nextUserInput)
    }
  }

  return (
      <>
        <PageButtonList>
          <div />
          <ButtonList>
            <LeftBtn onClick={() => {
              if (currentPage !== 1) {
                setCurrentPage(currentPage - 1)
              }
            }}>{'<'}</LeftBtn>
            {buttonList}
            <RightBtn onClick={() => {
              if (currentPage !== page) {
                setCurrentPage(currentPage + 1)
              }
            }}
            >{'>'}</RightBtn>
          </ButtonList>
          <ToPageWrapper>
            <input
                value={inputValue}
                onChange={event => {
                  // replace commas with periods, because uniswap exclusively uses period as the decimal separator
                  enforcer(event.target.value.replace(/,/g, '.'))
                }}
                autoComplete="off"
                autoCorrect="off"
                pattern="^[0-9]*[.,]?[0-9]*$"
                spellCheck="false"
                maxLength={String(page).length}
            />
            <GoBtn onClick={() => {
              if (inputValue !== '' && inputValue <= page) {
                setCurrentPage(parseInt(inputValue))
                setValue('')
              } else {
                setValue('')
              }
            }}>Go</GoBtn>
          </ToPageWrapper>
        </PageButtonList>
      </>
  )
}