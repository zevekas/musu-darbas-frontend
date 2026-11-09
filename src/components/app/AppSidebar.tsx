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
  // Building2,
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
    { label: t('nav.overview'), icon: LayoutDashboard, to: '/' },
    { label: t('nav.addPurchase'), icon: ShoppingCart, to: '/app' },
    { label: t('nav.updateStock'), icon: Boxes, to: '/app' },
  ] as const

  const spacesNav = [
    // { label: 'Blokas B', icon: Building2, to: '/app' },
    { label: t('nav.room', { room: 204 }), icon: DoorOpen, to: '/app' },
    { label: t('nav.sidebar.rooms'), icon: Plus, to: '/app' },
  ] as const

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          {/* Mock logo, replace with the real one later */}
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
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild>
                  <Link to={item.to}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{t('nav.sidebar.yourSpaces')}</SidebarGroupLabel>
          <SidebarMenu>
            {spacesNav.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild>
                  <Link to={item.to}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/app">
                <Settings />
                <span>{t('nav.sidebar.groupSettings')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
