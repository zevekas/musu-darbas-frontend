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

export default function AppSidebar() {
  const mainNav = [
    { label: 'Apžvalga', icon: LayoutDashboard, to: '/' },
    { label: 'Pridėti pirkinį', icon: ShoppingCart, to: '/app' },
    { label: 'Atnaujinti kiekį', icon: Boxes, to: '/app' },
  ] as const

  const spacesNav = [
    // { label: 'Blokas B', icon: Building2, to: '/app' },
    { label: 'Kambarys 204', icon: DoorOpen, to: '/app' },
    { label: 'Kambariai', icon: Plus, to: '/app' },
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
          <SidebarGroupLabel>Jūsų erdvės</SidebarGroupLabel>
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
                <span>Grupės nustatymai</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
