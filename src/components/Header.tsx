import type { ReactNode } from 'react'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import { Button } from '#/components/ui/button.tsx'
import { Link } from '@tanstack/react-router'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from 'react-i18next'

type HeaderProps = {
  /** Header left side content */
  children?: ReactNode
  /** Header right side content (before auth) */
  actions?: ReactNode
}

export function Header({ children, actions }: HeaderProps) {
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 border-b p-4 flex justify-between items-center bg-background">
      <div className="flex items-center gap-3">{children}</div>
      <div className="flex items-center gap-2.5">
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
            <Button variant={'outline'}>
              <Link to="/app">{t('nav.header.dashboard')}</Link>
            </Button>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: '2rem',
                    height: '2rem',
                  },
                },
              }}
            />
          </div>
        </Show>
      </div>
    </header>
  )
}
