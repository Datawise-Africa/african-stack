import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import SEO from '@/components/layout/SEO'

// Define the notification type
interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: string
  selected?: boolean
}

// Mock data for notifications
const notifications: Notification[] = [
  {
    id: '1',
    title: 'New comment on your article',
    description: 'User123 commented on "AI in African Agriculture"',
    time: '2 hours ago',
    read: false,
    type: 'comment'
  },
  {
    id: '2',
    title: 'Article published',
    description: 'Your article "Data Science for Financial Inclusion" has been published',
    time: '1 day ago',
    read: true,
    type: 'publish'
  },
  {
    id: '3',
    title: 'New reaction',
    description: 'User456 reacted with ❤️ to your article',
    time: '1 day ago',
    read: true,
    type: 'reaction'
  },
  {
    id: '4',
    title: 'Podcast approved',
    description: 'Your podcast "Data Privacy in the Digital Age" has been approved',
    time: '2 days ago',
    read: true,
    type: 'publish'
  },
  {
    id: '5',
    title: 'New follower',
    description: 'User789 started following you',
    time: '3 days ago',
    read: true,
    type: 'follow'
  },
  {
    id: '6',
    title: 'Earnings update',
    description: 'Your earnings for May 2023 are now available',
    time: '4 days ago',
    read: true,
    type: 'earnings'
  },
]

const NotificationsPage = () => {
  const [notificationList, setNotificationList] = useState<Notification[]>(notifications)
  const [selectAll, setSelectAll] = useState(false)

  const markAsRead = (id: string) => {
    setNotificationList(notificationList.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ))
  }

  const markAllAsRead = () => {
    setNotificationList(notificationList.map(notification =>
      ({ ...notification, read: true })
    ))
  }

  const deleteNotification = (id: string) => {
    setNotificationList(notificationList.filter(notification =>
      notification.id !== id
    ))
  }

  const toggleSelectAll = () => {
    setSelectAll(!selectAll)
    setNotificationList(notificationList.map(notification =>
      ({ ...notification, selected: !selectAll })
    ))
  }

  const selectedCount = notificationList.filter(n => n.selected).length

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO
        title="Notifications - African Stack"
        description="View and manage your notifications on the African Stack platform"
        keywords="notifications, alerts, updates, African technology"
      />
      
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-2">
              Stay updated with the latest activity
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={markAllAsRead}
              disabled={notificationList.every(n => n.read)}
            >
              Mark all as read
            </Button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>
            Customize which notifications you receive
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Comments</h3>
                <p className="text-sm text-gray-500">Notify me when someone comments on my content</p>
              </div>
              <Checkbox defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Reactions</h3>
                <p className="text-sm text-gray-500">Notify me when someone reacts to my content</p>
              </div>
              <Checkbox defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">New followers</h3>
                <p className="text-sm text-gray-500">Notify me when someone follows me</p>
              </div>
              <Checkbox defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Earnings updates</h3>
                <p className="text-sm text-gray-500">Notify me about my earnings</p>
              </div>
              <Checkbox defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Content approvals</h3>
                <p className="text-sm text-gray-500">Notify me when my content is approved</p>
              </div>
              <Checkbox defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>
                {notificationList.filter(n => !n.read).length} unread notifications
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all"
                checked={selectAll}
                onCheckedChange={() => toggleSelectAll()}
              />
              <label htmlFor="select-all" className="text-sm text-gray-500">
                Select all
              </label>
              {selectedCount > 0 && (
                <Button variant="outline" size="sm">
                  Delete selected ({selectedCount})
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {notificationList.length > 0 ? (
            <div className="space-y-4">
              {notificationList.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${
                    notification.read ? 'bg-gray-50' : 'bg-white border-blue-200'
                  }`}
                >
                  <div className="flex items-start">
                    <Checkbox
                      className="mt-1 mr-4"
                      checked={notification.selected || false}
                      onCheckedChange={(checked) => {
                        setNotificationList(notificationList.map(n =>
                          n.id === notification.id ? { ...n, selected: checked as boolean } : n
                        ))
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className={`font-medium ${!notification.read ? 'text-blue-600' : ''}`}>
                          {notification.title}
                        </h3>
                        <span className="text-sm text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-gray-600 mt-1">{notification.description}</p>
                      <div className="flex items-center mt-2 space-x-2">
                        {!notification.read && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🔔</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No notifications</h3>
              <p className="text-gray-500">
                You don't have any notifications at the moment.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default NotificationsPage