import { Button } from '#/components/ui/button'

export function AppFooter() {
  return (
    <>
      <footer className="text-muted-foreground border-t px-4 py-2 text-xs">
        <div className="flex items-center justify-between">
          <span>© 2026 BarakOK</span>
          <div className="flex items-center gap-4">
            <Button variant="link">Privatumas</Button>
            <Button variant="link">Sąlygos</Button>
          </div>
        </div>
      </footer>
    </>
  )
}
