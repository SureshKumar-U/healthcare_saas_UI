// Dashboard home page

import  { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { 
  Users, 
  Calendar, 
  Activity, 
  TrendingUp, 
  Clock,
  UserCheck,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { useAuthStore } from '../../store/useAuthStore';
import { apiService } from '../../services/api';
import  NotificationDemo from '../notifications/NotificationDemo';
import type { AnalyticsData, Appointment } from '../../types';
import { getStatusColor } from '@/app/utils/helpers';

const DashboardPage = () =>  {
  const { user } = useAuthStore();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [analyticsData, appointmentsData] = await Promise.all([
          apiService.getAnalytics(),
          apiService.getRecentAppointments(),
        ]);
        setAnalytics(analyticsData);
        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: 'Total Patients',
      value: analytics?.totalPatients || 0,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+12%',
      changeType: 'increase',
    },
    {
      title: 'Active Patients',
      value: analytics?.activePatients || 0,
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+5%',
      changeType: 'increase',
    },
    {
      title: 'Appointments Today',
      value: analytics?.appointmentsToday || 0,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '3 pending',
      changeType: 'neutral',
    },
    {
      title: 'Patient Satisfaction',
      value: analytics?.patientSatisfaction || 0,
      icon: Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      suffix: '/5.0',
      change: '+0.3',
      changeType: 'increase',
    },
  ];



  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {user?.name?.split(' ')[0] || 'User'}
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your healthcare platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <div className="flex items-baseline gap-1">
                      <p className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </p>
                      {stat.suffix && (
                        <span className="text-sm text-gray-500">{stat.suffix}</span>
                      )}
                    </div>
                    <p
                      className={`text-xs ${
                        stat.changeType === 'increase'
                          ? 'text-green-600'
                          : stat.changeType === 'decrease'
                          ? 'text-red-600'
                          : 'text-gray-600'
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Appointments</CardTitle>
                <CardDescription>Today's scheduled appointments</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/patients">
                  View all <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-gray-900">
                        {appointment.patientName}
                      </p>
                      <Badge
                        variant="secondary"
                        className={getStatusColor(appointment.status)}
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {appointment.doctorName}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {appointment.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {appointment.time}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Department Overview</CardTitle>
            <CardDescription>Patient distribution by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics?.departmentStats.slice(0, 5).map((dept) => (
                <div key={dept.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">{dept.name}</span>
                    <span className="text-gray-600">
                      {dept.patients} patients
                    </span>
                  </div>
                  <Progress
                    value={(dept.patients / (analytics?.totalPatients || 1)) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4" asChild>
              <Link to="/patients">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">View Patients</p>
                    <p className="text-xs text-gray-500">Manage patient records</p>
                  </div>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4" asChild>
              <Link to="/analytics">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Analytics</p>
                    <p className="text-xs text-gray-500">View insights</p>
                  </div>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Schedule</p>
                  <p className="text-xs text-gray-500">Book appointments</p>
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Alerts</p>
                  <p className="text-xs text-gray-500">Critical updates</p>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Service Demo */}
      <NotificationDemo />
    </div>
  );
}
export default DashboardPage;