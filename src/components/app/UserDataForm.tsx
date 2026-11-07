import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select'
import { useDorms } from '#/hooks/use-dorms.ts'

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
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Finish setting up your profile</CardTitle>
            <CardDescription>
              Choose a username and tell us where you live.
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
                placeholder="e.g. Petriukas"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dorm">Dorm</Label>
              <Select value={dormId} onValueChange={setDormId}>
                <SelectTrigger id="dorm" className="w-full">
                  <SelectValue placeholder="Select your dorm" />
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
              <Label htmlFor="room">Room number</Label>
              <Input
                id="room"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                autoComplete="off"
                placeholder="e.g. 412"
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
              {submitting ? 'Saving...' : 'Continue'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
