import { Link } from '@tanstack/react-router'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarFooter,
} from '../ui/sidebar'
import {
  Boxes,
  DoorOpen,
  LayoutDashboard,
  Plus,
  Settings,
  ShoppingCart,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function AppSidebar() {
  const { t } = useTranslation()

  const mainNav = [
    { id: 'overview', label: t('nav.overview'), icon: LayoutDashboard },
    { id: 'add-purchase', label: t('nav.addPurchase'), icon: ShoppingCart },
    { id: 'update-stock', label: t('nav.updateStock'), icon: Boxes },
  ] as const

  const spacesNav = [
    { id: 'room', label: t('nav.room', { room: 204 }), icon: DoorOpen },
    { id: 'rooms', label: t('nav.sidebar.rooms'), icon: Plus },
  ] as const

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center text-sm font-bold">
            B
          </div>
          <span className="text-sm font-semibold">BarakOK</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {mainNav.map((item) => (
              <SidebarMenuItem key={item.id}>
                {item.id === 'add-purchase' ? (
                  <SidebarMenuButton asChild>
                    <Link to="/app" search={{ view: 'add-purchase' }}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton>
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{t('nav.sidebar.yourSpaces')}</SidebarGroupLabel>

          <SidebarMenu>
            {spacesNav.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton>
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings />
              <span>{t('nav.sidebar.groupSettings')}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
