import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import { Button } from '#/components/ui/button.tsx'
import { Link } from '@tanstack/react-router'

export function Header() {
  return (
    <>
      <header className="sticky top-0 border-b p-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10"
              src={'/kfc-logo.jpg'}
              alt="KFC logo"
            />
          </div>

          <div>
            <Show when="signed-out">
              <div className="w-full h-full flex items-center gap-2">
                <SignInButton>
                  <Button variant={'outline'}>Prisijungti</Button>
                </SignInButton>
                <SignUpButton>
                  <Button variant={'outline'}>Registruotis</Button>
                </SignUpButton>
              </div>
            </Show>
            <Show when="signed-in">
              <div className="w-full h-full flex items-center gap-2.5">
                <Button variant={'outline'}>
                  <Link to="/app">Puslapis</Link>
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
        </div>
      </header>
    </>
  )
}
