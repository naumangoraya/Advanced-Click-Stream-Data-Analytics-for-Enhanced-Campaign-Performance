"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Check, User, Shield, Bell, Database, Key, Save, LogOut } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Account settings
  const [accountSettings, setAccountSettings] = useState({
    name: "John Doe",
    email: "john@example.com",
    company: "Acme Inc.",
    role: "Administrator",
  })

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: "90",
    sessionTimeout: "30",
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    browserNotifications: true,
    weeklyReports: true,
    criticalAlerts: true,
  })

  // Database settings
  const [databaseSettings, setDatabaseSettings] = useState({
    server: "localhost",
    database: "ecommerce_analytics",
    integratedSecurity: true,
  })

  // API settings
  const [apiSettings, setApiSettings] = useState({
    amazonApiKey: "amzn_api_xxxxx",
    aliexpressApiKey: "ali_api_xxxxx",
    darazApiKey: "drz_api_xxxxx",
  })

  const handleSave = () => {
    setIsSaving(true)
    setSaveSuccess(false)

    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    }, 1500)
  }

  const handleLogout = () => {
    // Simulate logout
    setTimeout(() => {
      router.push("/login")
    }, 500)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account and application preferences</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {saveSuccess && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border bg-green-50 p-4 text-green-700 dark:bg-green-900/20 dark:text-green-400">
          <Check className="h-5 w-5" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Account</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>Database</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span>API</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={accountSettings.name}
                    onChange={(e) => setAccountSettings({ ...accountSettings, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={accountSettings.email}
                    onChange={(e) => setAccountSettings({ ...accountSettings, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={accountSettings.company}
                    onChange={(e) => setAccountSettings({ ...accountSettings, company: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={accountSettings.role}
                    onChange={(e) => setAccountSettings({ ...accountSettings, role: e.target.value })}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Profile Picture</h3>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm" className="mb-2">
                      Upload New Picture
                    </Button>
                    <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size 1MB.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                  <Input
                    id="password-expiry"
                    type="number"
                    value={securitySettings.passwordExpiry}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, passwordExpiry: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Number of days before password expires. Set to 0 for no expiry.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">Time of inactivity before automatic logout</p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium">Change Password</h3>
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button className="mt-2">Update Password</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Control how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Alerts</h3>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, emailAlerts: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Browser Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                  </div>
                  <Switch
                    checked={notificationSettings.browserNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, browserNotifications: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Weekly Reports</h3>
                    <p className="text-sm text-muted-foreground">Receive weekly summary reports</p>
                  </div>
                  <Switch
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, weeklyReports: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Critical Alerts</h3>
                    <p className="text-sm text-muted-foreground">Receive alerts for critical issues (always enabled)</p>
                  </div>
                  <Switch
                    checked={notificationSettings.criticalAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, criticalAlerts: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle>Database Connection</CardTitle>
              <CardDescription>Configure your MS SQL Server connection with Windows Authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="server">Server Name</Label>
                  <Input
                    id="server"
                    value={databaseSettings.server}
                    onChange={(e) => setDatabaseSettings({ ...databaseSettings, server: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="database">Database Name</Label>
                  <Input
                    id="database"
                    value={databaseSettings.database}
                    onChange={(e) => setDatabaseSettings({ ...databaseSettings, database: e.target.value })}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="integrated-security"
                    checked={databaseSettings.integratedSecurity}
                    onCheckedChange={(checked) =>
                      setDatabaseSettings({ ...databaseSettings, integratedSecurity: checked })
                    }
                  />
                  <Label htmlFor="integrated-security">Use Windows Authentication</Label>
                </div>

                <p className="text-sm text-muted-foreground">
                  The application uses Windows Authentication to connect to your MS SQL Server database. Make sure the
                  application is running with appropriate Windows credentials.
                </p>

                <Button variant="outline">Test Connection</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Credentials</CardTitle>
              <CardDescription>Manage your platform API credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amazon-api-key">Amazon API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="amazon-api-key"
                      type="password"
                      value={apiSettings.amazonApiKey}
                      onChange={(e) => setApiSettings({ ...apiSettings, amazonApiKey: e.target.value })}
                    />
                    <Button variant="outline">Show</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aliexpress-api-key">AliExpress API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="aliexpress-api-key"
                      type="password"
                      value={apiSettings.aliexpressApiKey}
                      onChange={(e) => setApiSettings({ ...apiSettings, aliexpressApiKey: e.target.value })}
                    />
                    <Button variant="outline">Show</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="daraz-api-key">Daraz API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="daraz-api-key"
                      type="password"
                      value={apiSettings.darazApiKey}
                      onChange={(e) => setApiSettings({ ...apiSettings, darazApiKey: e.target.value })}
                    />
                    <Button variant="outline">Show</Button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  API keys are used to authenticate with the respective e-commerce platforms. Keep these keys secure and
                  never share them.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
