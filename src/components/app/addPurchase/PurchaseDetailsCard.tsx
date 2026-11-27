import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { RoomMember } from '#/hooks/use-room-members-TEMP'

type PurchaseDetailsCardProps = {
  members: RoomMember[] | undefined
  membersLoading: boolean
  membersError: boolean
  paidBy: string
  onPaidByChange: (userId: string) => void
  purchaseDate: string
  maxPurchaseDate: string
  onPurchaseDateChange: (date: string) => void
  note: string
  onNoteChange: (note: string) => void
}

export function PurchaseDetailsCard({
  members = [],
  membersLoading,
  membersError,
  paidBy,
  onPaidByChange,
  purchaseDate,
  maxPurchaseDate,
  onPurchaseDateChange,
  note,
  onNoteChange,
}: PurchaseDetailsCardProps) {
  const { t } = useTranslation()

  const selectedMember = members.find((m) => m.userId === paidBy)

  function memberLabel(member: RoomMember) {
    return member.isCurrentUser
      ? `${member.username} (${t('addPurchase.details.you')})`
      : member.username
  }

  return (
    <Card className="bg-transparent py-0 ring-0 sm:bg-card sm:py-(--card-spacing) sm:ring-1">
      <CardHeader className="px-0 sm:px-(--card-spacing)">
        <CardTitle>{t('addPurchase.details.title')}</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 gap-4 px-0 sm:px-(--card-spacing) md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="paid-by">{t('addPurchase.details.paidBy')}</Label>

          <Select
            value={paidBy}
            onValueChange={onPaidByChange}
            disabled={membersLoading}
          >
            <SelectTrigger id="paid-by" className="w-full">
              <SelectValue
                placeholder={
                  membersLoading
                    ? t('common.loading')
                    : t('addPurchase.details.paidByPlaceholder')
                }
              >
                {selectedMember ? memberLabel(selectedMember) : undefined}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              {members.map((member) => (
                <SelectItem key={member.userId} value={member.userId}>
                  {memberLabel(member)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {membersError && (
            <p role="alert" className="text-sm text-destructive">
              {t('addPurchase.errors.loadMembers')}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="purchase-date">
            {t('addPurchase.details.purchaseDate')}
          </Label>
          <Input
            id="purchase-date"
            type="date"
            max={maxPurchaseDate}
            value={purchaseDate}
            onChange={(e) => onPurchaseDateChange(e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="note">{t('addPurchase.details.note')}</Label>
          <Input
            id="note"
            placeholder={t('addPurchase.details.notePlaceholder')}
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
