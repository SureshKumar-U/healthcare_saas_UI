
import { Mail, Phone, Calendar, Activity } from 'lucide-react';
import type { Patient } from '../../types';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { usePatientStore } from '../../store/usePatientStore';
import { getStatusColor } from '@/app/utils/helpers';

interface PatientGridProps {
  patients: Patient[];
}

const PatientGrid = ({ patients }: PatientGridProps) =>  {
  const { selectPatient } = usePatientStore();

;

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {patients.map((patient) => (
        <Card
          key={patient.id}
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => selectPatient(patient)}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                  {getInitials(patient.firstName, patient.lastName)}
                </AvatarFallback>
              </Avatar>
              <Badge className={getStatusColor(patient.status)}>
                {patient.status}
              </Badge>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {patient.firstName} {patient.lastName}
                </h3>
                <p className="text-sm text-gray-500">{patient.id}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{patient.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Last visit: {patient.lastVisit}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Activity className="w-4 h-4" />
                  <span className="truncate">{patient.assignedDoctor}</span>
                </div>
              </div>

              {patient.nextAppointment && (
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500">Next appointment</p>
                  <p className="text-sm font-medium text-gray-900">
                    {patient.nextAppointment}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default PatientGrid;