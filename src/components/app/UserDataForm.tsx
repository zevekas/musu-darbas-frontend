import { useState } from 'react'
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
import { useTranslation } from 'react-i18next'

export type UserDataValues = {
  username: string
  dormId: string
  roomNumber: string
}

type UserDataFormProps = {
  submitting?: boolean
  error?: string | null
  onSubmit: (values: UserDataValues) => void
}

export function UserDataForm({
  submitting = false,
  error,
  onSubmit,
}: UserDataFormProps) {
  const [username, setUsername] = useState('')
  const [dormId, setDormId] = useState('')
  const [roomNumber, setRoomNumber] = useState('')
  const { t } = useTranslation()

  const { data: dorms } = useDorms()

  const canSubmit =
    username.trim().length >= 3 && dormId !== '' && roomNumber.trim() !== ''

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit || submitting) return
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
            <CardTitle>{t('auth.userDataForm.title')}</CardTitle>
            <CardDescription>
              {t('auth.userDataForm.description')}
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">
                {t('auth.userDataForm.username')}
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
                placeholder={t('auth.userDataForm.usernamePlaceholder')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dorm">{t('auth.userDataForm.dorm')}</Label>
              <Select value={dormId} onValueChange={setDormId}>
                <SelectTrigger id="dorm" className="w-full">
                  <SelectValue
                    placeholder={t('auth.userDataForm.dormPlaceholder')}
                  />
                </SelectTrigger>
                <SelectContent>
                  {dorms?.dorms.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      {d.address}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="room">{t('auth.userDataForm.roomNumber')}</Label>
              <Input
                id="room"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                autoComplete="off"
                placeholder={t('auth.userDataForm.roomNumberPlaceholder')}
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>

          <CardFooter className="mt-6">
            <Button
              type="submit"
              className="w-full"
              disabled={!canSubmit || submitting}
            >
              {submitting
                ? t('auth.userDataForm.button.saving')
                : t('auth.userDataForm.button.continue')}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
