import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import { Button } from '#/components/ui/button.tsx'
import { Link } from '@tanstack/react-router'
import { SidebarTrigger } from '#/components/ui/sidebar'
import { CircleHelp } from 'lucide-react'

export function AppHeader() {
  return (
    <>
      <header className="sticky top-0 border-b p-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <SidebarTrigger />

            <div className="flex items-baseline gap-1.5 text-sm">
              <span className="font-medium">Kambarys 204</span>
              <span className="text-muted-foreground text-xs">
                • Didlaukio g. 59
              </span>
            </div>
          </div>
          <div>
            <Button variant="ghost">
              <CircleHelp />
              <span className="hidden sm:inline">Pagalba</span>
            </Button>

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
