import { Flex, IconButton, CogIcon2, CogIcon, useModal } from '@pancakeswap/uikit'
import SettingsModal from './SettingsModal'

type Props = {
  color?: string
  mr?: string
  mode?: string
}

export const GlobalSettings = ({ color, mr = '8px', mode }: Props) => {
  const [onPresentSettingsModal] = useModal(<SettingsModal mode={mode} />)

  return (
    <Flex>
      <IconButton
        onClick={onPresentSettingsModal}
        variant="text"
        scale="sm"
        mr={mr}
        id={`open-settings-dialog-button-${mode}`}
      >
        <CogIcon height={20} width={20} />
      </IconButton>
    </Flex>
  )
}

export const GlobalSettings2 = ({ color, mr = '8px', mode }: Props) => {
  const [onPresentSettingsModal] = useModal(<SettingsModal mode={mode} />)

  return (
      <Flex>
        <IconButton
            onClick={onPresentSettingsModal}
            variant="text"
            scale="sm"
            mr={mr}
            id={`open-settings-dialog-button-${mode}`}
        >
          <CogIcon2 height={24} width={24} />
        </IconButton>
      </Flex>
  )
}
