
import { Mail, Phone, Calendar, ChevronRight } from 'lucide-react';
import type { Patient } from '../../types';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Card, CardContent } from '../ui/card';
import { usePatientStore } from '../../store/usePatientStore';
import { getStatusColor } from '@/app/utils/helpers';

interface PatientListProps {
  patients: Patient[];
}

const PatientList = ({ patients }: PatientListProps) => {
  const { selectPatient } = usePatientStore();


  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-200">
          {/* Header */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-sm font-medium text-gray-600">
            <div className="col-span-3">Patient</div>
            <div className="col-span-2">Contact</div>
            <div className="col-span-2">Blood Type</div>
            <div className="col-span-2">Last Visit</div>
            <div className="col-span-2">Doctor</div>
            <div className="col-span-1 text-center">Status</div>
          </div>

          {/* Rows */}
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => selectPatient(patient)}
            >
              {/* Patient Info */}
              <div className="col-span-1 lg:col-span-3 flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-sm">
                    {getInitials(patient.firstName, patient.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {patient.firstName} {patient.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{patient.id}</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="col-span-1 lg:col-span-2 space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{patient.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{patient.phone}</span>
                </div>
              </div>

              {/* Blood Type */}
              <div className="col-span-1 lg:col-span-2 flex items-center">
                <span className="text-sm text-gray-900">{patient.bloodType}</span>
              </div>

              {/* Last Visit */}
              <div className="col-span-1 lg:col-span-2 flex items-center">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>{patient.lastVisit}</span>
                </div>
              </div>

              {/* Assigned Doctor */}
              <div className="col-span-1 lg:col-span-2 flex items-center">
                <span className="text-sm text-gray-900 truncate">
                  {patient?.assignedDoctor}
                </span>
              </div>

              {/* Status */}
              <div className="col-span-1 lg:col-span-1 flex items-center justify-center lg:justify-center">
                <Badge className={getStatusColor(patient.status)}>
                  {patient.status}
                </Badge>
              </div>

              {/* Action Icon (mobile) */}
              <div className="lg:hidden flex justify-end">
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default PatientList;