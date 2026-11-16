import { useState, type FormEvent } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDorms } from '#/hooks/use-dorms.ts'
import { useUserData } from '#/hooks/use-user-data.ts'
import { useTranslation } from 'react-i18next'

export type UserDataValues = {
  username: string
  dormId: string
  roomNumber: string
}

type UserDataFormProps = {
  mode?: 'onboarding' | 'edit'
  initialValues?: UserDataValues
  submitting?: boolean
  error?: string | null
  onSubmit: (values: UserDataValues) => void
}

type EditUserDataFormProps = Omit<UserDataFormProps, 'mode' | 'initialValues'>

const LABELS = {
  onboarding: {
    title: 'auth.profile.onboarding.title',
    submit: 'auth.profile.onboarding.button.continue',
  },
  edit: {
    title: 'auth.profile.edit.title',
    submit: 'auth.profile.edit.button.save',
  },
} as const


export function EditUserDataForm(props: EditUserDataFormProps) {
  const { t } = useTranslation()
  const { getUserData } = useUserData()
  const { data: dorms, isLoading: dormsLoading } = useDorms()
  const { data: user, isLoading: userLoading } = getUserData

  if (userLoading || dormsLoading) return <div>{t('common.loading')}</div>

  // useUserData returns the dorm address, the form works with the dorm id
  const dormId = dorms?.dorms.find((d) => d.address === user?.dorm)?.id

  return (
    <UserDataForm
      {...props}
      mode="edit"
      initialValues={{
        username: user?.username ?? '',
        dormId: String(dormId ?? ''),
        roomNumber: user?.room ?? '',
      }}
    />
  )
}


export function UserDataForm({
  mode = 'onboarding',
  initialValues,
  submitting = false,
  error,
  onSubmit,
}: UserDataFormProps) {
  const { t } = useTranslation()
  const { data: dorms } = useDorms()

  const [username, setUsername] = useState(initialValues?.username ?? '')
  const [dormId, setDormId] = useState(initialValues?.dormId ?? '')
  const [roomNumber, setRoomNumber] = useState(initialValues?.roomNumber ?? '')

  const selectedDorm = dorms?.dorms.find((d) => String(d.id) === dormId)

  const isValid =
    username.trim().length >= 3 && dormId !== '' && roomNumber.trim() !== ''

  const hasChanges =
    !initialValues ||
    username.trim() !== initialValues.username ||
    dormId !== initialValues.dormId ||
    roomNumber.trim() !== initialValues.roomNumber

  const canSubmit = isValid && hasChanges && !submitting

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    onSubmit({
      username: username.trim(),
      dormId,
      roomNumber: roomNumber.trim(),
    })
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>{t(LABELS[mode].title)}</CardTitle>
            <CardDescription>{t('auth.profile.description')}</CardDescription>
          </CardHeader>

          <CardContent className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{t('auth.profile.username')}</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
                placeholder={t('auth.profile.usernamePlaceholder')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dorm">{t('auth.profile.dorm')}</Label>
              <Select value={dormId} onValueChange={setDormId}>
                <SelectTrigger id="dorm" className="w-full">
                  <SelectValue placeholder={t('auth.profile.dormPlaceholder')}>
                    {selectedDorm?.address}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {dorms?.dorms.map((d) => (
                    <SelectItem key={d.id} value={String(d.id)}>
                      {d.address}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="room">{t('auth.profile.roomNumber')}</Label>
              <Input
                id="room"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                autoComplete="off"
                placeholder={t('auth.profile.roomNumberPlaceholder')}
              />
            </div>

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}
          </CardContent>

          <CardFooter className="mt-6">
            <Button type="submit" className="w-full" disabled={!canSubmit}>
              {t(submitting ? 'auth.profile.buttonSaving' : LABELS[mode].submit)}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}