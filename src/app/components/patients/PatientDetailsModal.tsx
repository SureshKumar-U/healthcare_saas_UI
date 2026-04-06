// Patient Details Modal Component


import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Activity,
  AlertCircle,
  Pill,
  User,
  Shield,

} from 'lucide-react';
import type { Patient } from '../../types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { calculateAge, getStatusColor } from '@/app/utils/helpers';

interface PatientDetailsModalProps {
  patient: Patient | null;
  open: boolean;
  onClose: () => void;
}

export function PatientDetailsModal({
  patient,
  open,
  onClose,
}: PatientDetailsModalProps) {
  if (!patient) return null;


  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };


  return (
    <div >
    <Dialog   open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Patient Details</DialogTitle>
          <DialogDescription>Complete patient information and medical history</DialogDescription>
        </DialogHeader>

        {/* Patient Header */}
        <div className="flex items-start gap-3 pb-4 border-b">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xl">
              {getInitials(patient.firstName, patient.lastName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {patient.firstName} {patient.lastName}
                </h2>
                <p className="text-gray-600 mt-1">{patient.id}</p>
              </div>
              <Badge className={getStatusColor(patient.status)}>
                {patient.status}
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-medium">{calculateAge(patient.dateOfBirth)} years</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium capitalize">{patient.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Blood Type</p>
                <p className="font-medium">{patient.bloodType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{patient.dateOfBirth}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="contact" className="mt-3">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="medical">Medical</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
          </TabsList>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{patient.email}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{patient.phone}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{patient.address}</p>
                    <p className="font-medium">
                      {patient.city}, {patient.state} {patient.zipCode}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medical Tab */}
          <TabsContent value="medical" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Medical History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {patient.medicalHistory.length > 0 ? (
                    <ul className="space-y-2">
                      {patient.medicalHistory.map((condition, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                          <span>{condition}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No medical history recorded</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Allergies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {patient.allergies.length > 0 ? (
                    <ul className="space-y-2">
                      {patient.allergies.map((allergy, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Badge variant="destructive" className="text-xs">
                            {allergy}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No known allergies</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Pill className="w-4 h-4" />
                  Current Medications
                </CardTitle>
              </CardHeader>
              <CardContent>
                {patient.currentMedications.length > 0 ? (
                  <ul className="space-y-2">
                    {patient.currentMedications.map((medication, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                        <span>{medication}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No current medications</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Appointments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Last Visit</p>
                  <p className="font-medium">{patient.lastVisit}</p>
                </div>
                {patient.nextAppointment && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm text-gray-500">Next Appointment</p>
                      <p className="font-medium">{patient.nextAppointment}</p>
                    </div>
                  </>
                )}
                <Separator />
                <div>
                  <p className="text-sm text-gray-500">Assigned Doctor</p>
                  <p className="font-medium">{patient.assignedDoctor}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insurance Tab */}
          <TabsContent value="insurance" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Insurance Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Provider</p>
                  <p className="font-medium">{patient.insuranceProvider}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-gray-500">Insurance ID</p>
                  <p className="font-medium">{patient.insuranceId}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emergency Tab */}
          <TabsContent value="emergency" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{patient.emergencyContact.name}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{patient.emergencyContact.phone}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-gray-500">Relationship</p>
                  <p className="font-medium capitalize">
                    {patient.emergencyContact.relationship}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Edit Patient</Button>
        </div>
      </DialogContent>
    </Dialog>
    </div>

  );
}
