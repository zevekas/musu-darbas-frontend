import type { ReactNode } from 'react'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import { Button } from '#/components/ui/button.tsx'
import { Link, useNavigate } from '@tanstack/react-router'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from 'react-i18next'
import { User } from 'lucide-react'

type HeaderProps = {
  /** Header left side content */
  children?: ReactNode
  /** Header right side content (before auth) */
  actions?: ReactNode
  /** Show the "Dashboard" button for signed-in users (redundant inside the app) */
  showDashboardLink?: boolean
}

export function Header({
  children,
  actions,
  showDashboardLink = true,
}: HeaderProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b bg-background p-4">
      <div className="flex min-w-0 flex-1 items-center gap-3">{children}</div>
      <div className="flex shrink-0 items-center gap-1 sm:gap-2.5">
        {actions}
        <LanguageSwitcher />
        <Show when="signed-out">
          <div className="flex items-center gap-2">
            <SignInButton>
              <Button variant={'outline'}>{t('auth.login')}</Button>
            </SignInButton>
            <SignUpButton>
              <Button variant={'outline'}>{t('auth.register')}</Button>
            </SignUpButton>
          </div>
        </Show>
        <Show when="signed-in">
          <div className="flex items-center gap-2.5">
            {showDashboardLink && (
              <Button variant={'outline'} asChild>
                <Link to="/app">{t('nav.header.dashboard')}</Link>
              </Button>
            )}
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: '2rem',
                    height: '2rem',
                  },
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Action
                  label={t('auth.accountButton.profile')}
                  labelIcon={<User className="size-4" />}
                  onClick={() => navigate({ to: '/profile' })}
                />
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
          </div>
        </Show>
      </div>
    </header>
  )
}
