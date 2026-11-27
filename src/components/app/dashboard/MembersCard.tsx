import { useTranslation } from 'react-i18next'
import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { formatSigned } from '#/lib/format'
import type { RoomMemberBalance } from '#/hooks/use-room-members'

type MembersCardProps = {
  members: RoomMemberBalance[] | undefined
  membersLoading: boolean
  membersError: boolean
}

export function MembersCard({
  members,
  membersLoading,
  membersError,
}: MembersCardProps) {
  const { t, i18n } = useTranslation()
  const me = members?.find((m) => m.isCurrentUser)

  const caption = (balance: number) =>
    balance > 0
      ? t('dashboard.members.claimable')
      : balance < 0
        ? t('dashboard.members.debt')
        : t('dashboard.members.settled')

  const tone = (balance: number) =>
    balance > 0
      ? 'text-emerald-700'
      : balance < 0
        ? 'text-foreground'
        : 'text-muted-foreground'

  return (
    <Card className="gap-0 p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">
          {t('dashboard.members.title')}
        </h2>
        <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
          {t('dashboard.members.count', { count: members?.length ?? 0 })}
        </span>
      </div>

      {membersLoading && <Skeleton className="mt-5 h-64" />}
      {membersError && (
        <p role="alert" className="mt-5 text-sm text-destructive">
          {t('common.error')}
        </p>
      )}

      {members && (
        <>
          {me && (
            <div className="mt-5 rounded-xl bg-primary/10 p-4">
              <p className="text-sm text-primary">
                {t('dashboard.members.yourBalance')}
              </p>
              <p className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-semibold tabular-nums text-primary">
                  {formatSigned(me.balance, i18n.language)}
                </span>
                <span className="text-sm text-primary">
                  {caption(me.balance)}
                </span>
              </p>
            </div>
          )}

          <ul className="mt-4 space-y-4">
            {members.map((m) => (
              <li key={m.userId} className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-medium"
                >
                  {m.username.charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{m.username}</p>
                  <p className="text-xs text-muted-foreground">
                    {m.isCurrentUser
                      ? t('dashboard.members.youRoom', { room: m.roomNumber })
                      : t('nav.room', { room: m.roomNumber })}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={cn(
                      'text-sm font-semibold tabular-nums',
                      tone(m.balance),
                    )}
                  >
                    {formatSigned(m.balance, i18n.language)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {caption(m.balance)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Separator className="my-5" />
          {/* TODO: wire up when the invite endpoint exists */}
          <Button variant="outline" className="w-full">
            <UserPlus className="size-4" aria-hidden />
            {t('dashboard.members.invite')}
          </Button>
        </>
      )}
    </Card>
  )
}
