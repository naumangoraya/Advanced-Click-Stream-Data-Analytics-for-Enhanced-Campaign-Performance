"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Trash2, Plus, Mail, TrendingDown, Edit, Save } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function EmailSettingsPage() {
  const [emails, setEmails] = useState([
    {
      id: 1,
      email: "john@example.com",
      alerts: ["sales", "sentiment", "reports"],
      status: "active",
    },
    {
      id: 2,
      email: "marketing@example.com",
      alerts: ["sentiment", "reports"],
      status: "active",
    },
    {
      id: 3,
      email: "analytics@example.com",
      alerts: ["sales", "reports"],
      status: "inactive",
    },
  ])

  const [alertTypes, setAlertTypes] = useState([
    {
      id: "sales",
      label: "Sales Alerts",
      description: "Low sales performance and significant drops in revenue",
      icon: TrendingDown,
      threshold: "15%",
      period: "Weekly",
    },
    {
      id: "sentiment",
      label: "Sentiment Alerts",
      description: "Negative customer sentiment and reviews",
      icon: AlertCircle,
      threshold: "15%",
      period: "Daily",
    },
    {
      id: "reports",
      label: "Regular Reports",
      description: "Daily, weekly and monthly performance reports",
      icon: Mail,
      frequency: "Weekly",
      day: "Friday",
    },
  ])

  const [newEmail, setNewEmail] = useState("")
  const [selectedAlerts, setSelectedAlerts] = useState({
    sales: false,
    sentiment: false,
    reports: false,
  })

  const [editingAlertId, setEditingAlertId] = useState(null)
  const [editingAlert, setEditingAlert] = useState(null)

  // For editing email alerts
  const [editingEmailId, setEditingEmailId] = useState(null)
  const [editingEmailAlerts, setEditingEmailAlerts] = useState({
    sales: false,
    sentiment: false,
    reports: false,
  })

  const handleAddEmailRef = useState({
    sales: false,
    sentiment: false,
    reports: false,
  })

  const handleAddEmail = () => {
    if (!validateEmail(newEmail)) return

    const selectedAlertsList = Object.entries(selectedAlerts)
      .filter(([_, isSelected]) => isSelected)
      .map(([alertType]) => alertType)

    if (selectedAlertsList.length === 0) return

    const newEmailEntry = {
      id: emails.length + 1,
      email: newEmail,
      alerts: selectedAlertsList,
      status: "active",
    }

    setEmails([...emails, newEmailEntry])
    setNewEmail("")
    setSelectedAlerts({
      sales: false,
      sentiment: false,
      reports: false,
    })
  }

  const handleDeleteEmail = (id) => {
    setEmails(emails.filter((email) => email.id !== id))
  }

  const toggleEmailStatus = (id) => {
    setEmails(
      emails.map((email) => {
        if (email.id === id) {
          return {
            ...email,
            status: email.status === "active" ? "inactive" : "active",
          }
        }
        return email
      }),
    )
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleEditAlert = (alert) => {
    setEditingAlertId(alert.id)
    setEditingAlert({ ...alert })
  }

  const handleSaveAlertChanges = () => {
    setAlertTypes(
      alertTypes.map((alert) => {
        if (alert.id === editingAlertId) {
          return { ...editingAlert }
        }
        return alert
      }),
    )
    setEditingAlertId(null)
    setEditingAlert(null)
  }

  // Handle editing email alerts
  const handleEditEmailAlerts = (email) => {
    setEditingEmailId(email.id)
    const currentAlerts = {
      sales: email.alerts.includes("sales"),
      sentiment: email.alerts.includes("sentiment"),
      reports: email.alerts.includes("reports"),
    }
    setEditingEmailAlerts(currentAlerts)
  }

  const handleSaveEmailAlerts = () => {
    setEmails(
      emails.map((email) => {
        if (email.id === editingEmailId) {
          const updatedAlerts = Object.entries(editingEmailAlerts)
            .filter(([_, isSelected]) => isSelected)
            .map(([alertType]) => alertType)

          return {
            ...email,
            alerts: updatedAlerts,
          }
        }
        return email
      }),
    )
    setEditingEmailId(null)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Email Settings</h1>
        <p className="text-muted-foreground">Manage email notifications and alerts</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Email Recipients</CardTitle>
            <CardDescription>Manage who receives alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email Address</TableHead>
                    <TableHead>Alert Types</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emails.map((email) => (
                    <TableRow key={email.id}>
                      <TableCell className="font-medium">{email.email}</TableCell>
                      <TableCell>
                        {editingEmailId === email.id ? (
                          <div className="flex flex-wrap gap-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`sales-${email.id}`}
                                checked={editingEmailAlerts.sales}
                                onCheckedChange={(checked) =>
                                  setEditingEmailAlerts({ ...editingEmailAlerts, sales: checked })
                                }
                              />
                              <label htmlFor={`sales-${email.id}`} className="text-sm">
                                Sales
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`sentiment-${email.id}`}
                                checked={editingEmailAlerts.sentiment}
                                onCheckedChange={(checked) =>
                                  setEditingEmailAlerts({ ...editingEmailAlerts, sentiment: checked })
                                }
                              />
                              <label htmlFor={`sentiment-${email.id}`} className="text-sm">
                                Sentiment
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`reports-${email.id}`}
                                checked={editingEmailAlerts.reports}
                                onCheckedChange={(checked) =>
                                  setEditingEmailAlerts({ ...editingEmailAlerts, reports: checked })
                                }
                              />
                              <label htmlFor={`reports-${email.id}`} className="text-sm">
                                Reports
                              </label>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-1">
                            {email.alerts.includes("sales") && (
                              <Badge
                                variant="outline"
                                className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-900"
                              >
                                Sales
                              </Badge>
                            )}
                            {email.alerts.includes("sentiment") && (
                              <Badge
                                variant="outline"
                                className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-900"
                              >
                                Sentiment
                              </Badge>
                            )}
                            {email.alerts.includes("reports") && (
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900"
                              >
                                Reports
                              </Badge>
                            )}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={email.status === "active" ? "default" : "secondary"}
                          className="cursor-pointer"
                          onClick={() => toggleEmailStatus(email.id)}
                        >
                          {email.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {editingEmailId === email.id ? (
                            <Button variant="outline" size="sm" onClick={handleSaveEmailAlerts}>
                              <Save className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm" onClick={() => handleEditEmailAlerts(email)}>
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteEmail(email.id)}>
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Email
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Email Recipient</DialogTitle>
                  <DialogDescription>Add a new email to receive notifications and alerts</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Select Alert Types</Label>
                    <div className="space-y-2">
                      {alertTypes.map((alert) => (
                        <div key={alert.id} className="flex items-start space-x-2 rounded-md border p-3">
                          <Checkbox
                            id={alert.id}
                            checked={selectedAlerts[alert.id]}
                            onCheckedChange={(checked) => setSelectedAlerts({ ...selectedAlerts, [alert.id]: checked })}
                          />
                          <div className="flex flex-col">
                            <label
                              htmlFor={alert.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {alert.label}
                            </label>
                            <p className="text-sm text-muted-foreground">{alert.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddEmail} disabled={!validateEmail(newEmail)}>
                    Add Recipient
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alert Settings</CardTitle>
            <CardDescription>Configure when and how alerts are sent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alertTypes.map((alert) => (
                <div key={alert.id} className="rounded-md border p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <alert.icon
                        className={`h-5 w-5 ${
                          alert.id === "sales"
                            ? "text-blue-600"
                            : alert.id === "sentiment"
                              ? "text-amber-600"
                              : "text-green-600"
                        } mt-0.5`}
                      />
                      <div className="space-y-1">
                        <h3 className="font-medium">{alert.label}</h3>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>

                        {editingAlertId === alert.id ? (
                          <div className="flex flex-wrap items-center gap-2 pt-2">
                            {alert.id === "sales" || alert.id === "sentiment" ? (
                              <>
                                <Label className="text-sm">Threshold:</Label>
                                <select
                                  className="rounded-md border px-2 py-1 text-sm"
                                  value={editingAlert.threshold}
                                  onChange={(e) => setEditingAlert({ ...editingAlert, threshold: e.target.value })}
                                >
                                  <option>5%</option>
                                  <option>10%</option>
                                  <option>15%</option>
                                  <option>20%</option>
                                  <option>25%</option>
                                </select>

                                <Label className="text-sm ml-4">Period:</Label>
                                <select
                                  className="rounded-md border px-2 py-1 text-sm"
                                  value={editingAlert.period}
                                  onChange={(e) => setEditingAlert({ ...editingAlert, period: e.target.value })}
                                >
                                  <option>Daily</option>
                                  <option>Weekly</option>
                                  <option>Monthly</option>
                                </select>
                              </>
                            ) : (
                              <>
                                <Label className="text-sm">Frequency:</Label>
                                <select
                                  className="rounded-md border px-2 py-1 text-sm"
                                  value={editingAlert.frequency}
                                  onChange={(e) => setEditingAlert({ ...editingAlert, frequency: e.target.value })}
                                >
                                  <option>Daily</option>
                                  <option>Weekly</option>
                                  <option>Monthly</option>
                                </select>

                                <Label className="text-sm ml-4">Day:</Label>
                                <select
                                  className="rounded-md border px-2 py-1 text-sm"
                                  value={editingAlert.day}
                                  onChange={(e) => setEditingAlert({ ...editingAlert, day: e.target.value })}
                                >
                                  <option>Monday</option>
                                  <option>Friday</option>
                                  <option>Saturday</option>
                                  <option>Sunday</option>
                                </select>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 pt-2">
                            {alert.id === "sales" || alert.id === "sentiment" ? (
                              <>
                                <Label className="text-sm">Threshold:</Label>
                                <span className="text-sm">{alert.threshold}</span>

                                <Label className="text-sm ml-4">Period:</Label>
                                <span className="text-sm">{alert.period}</span>
                              </>
                            ) : (
                              <>
                                <Label className="text-sm">Frequency:</Label>
                                <span className="text-sm">{alert.frequency}</span>

                                <Label className="text-sm ml-4">Day:</Label>
                                <span className="text-sm">{alert.day}</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      {editingAlertId === alert.id ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleSaveAlertChanges}
                          className="flex items-center gap-1"
                        >
                          <Save className="h-4 w-4" />
                          <span>Save</span>
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditAlert(alert)}
                          className="flex items-center gap-1"
                        >
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
