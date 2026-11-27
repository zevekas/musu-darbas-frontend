import { Link, useMatchRoute } from '@tanstack/react-router'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '../ui/sidebar'
import {
  Boxes,
  PackagePlus,
  LayoutDashboard,
  Settings,
  ShoppingCart,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function AppSidebar() {
  const { t } = useTranslation()
  const matchRoute = useMatchRoute()
  const { isMobile, setOpenMobile } = useSidebar()

  // On mobile the sidebar is a sheet over the page, close it after navigating
  function closeOnMobile() {
    if (isMobile) setOpenMobile(false)
  }

  const mainNav = [
    { label: t('nav.dashboard'), icon: LayoutDashboard, to: '/app' },
    {
      label: t('nav.addPurchase'),
      icon: ShoppingCart,
      to: '/app/add-purchase',
    },
    {
      label: t('nav.newProduct'),
      icon: PackagePlus,
      to: '/app/create-product',
    },
    // TODO: enable once the update stock page exists
    { label: t('nav.updateStock'), icon: Boxes, to: null },
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
                {item.to ? (
                  <SidebarMenuButton
                    asChild
                    isActive={!!matchRoute({ to: item.to })}
                  >
                    <Link
                      to={item.to}
                      activeOptions={{ exact: true }}
                      onClick={closeOnMobile}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton disabled>
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild disabled>
              <Link to="/app" onClick={closeOnMobile}>
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
