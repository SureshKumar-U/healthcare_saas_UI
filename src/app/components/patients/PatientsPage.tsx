// Patients page with Grid/List view toggle

import  { useEffect, useState } from 'react';
import { Grid3x3, List, Search, Filter, Plus } from 'lucide-react';
import { usePatientStore } from '../../store/usePatientStore';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import  PatientGrid from './PatientGrid';
import  PatientList  from './patientList';
import { PatientDetailsModal } from './PatientDetailsModal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const PatientsPage = () =>  {
  const {
    patients,
    viewMode,
    searchQuery,
    filterStatus,
    isLoading,
    selectedPatient,
    setViewMode,
    setSearchQuery,
    setFilterStatus,
    selectPatient,
    fetchPatients,
  } = usePatientStore();

  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  useEffect(() => {
    if (selectedPatient) {
      setDetailsOpen(true);
    }
  }, [selectedPatient]);

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      searchQuery === '' ||
      patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterStatus === 'all' || patient.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    selectPatient(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Patients</h1>
          <p className="text-gray-600 mt-1">
            Manage and view patient records ({filteredPatients.length} patients)
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Patient
        </Button>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search patients by name, ID, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Status Filter */}
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>

        {/* View Mode Toggle */}
        <Tabs
          value={viewMode}
          onValueChange={(value) => setViewMode(value as 'grid' | 'list')}
        >
          <TabsList>
            <TabsTrigger value="grid">
              <Grid3x3 className="w-4 h-4 mr-2" />
              Grid
            </TabsTrigger>
            <TabsTrigger value="list">
              <List className="w-4 h-4 mr-2" />
              List
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Patient Views */}
      {filteredPatients.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No patients found</p>
        </div>
      ) : viewMode === 'grid' ? (
        <PatientGrid patients={filteredPatients} />
      ) : (
        <PatientList patients={filteredPatients} />
      )}

      {/* Patient Details Modal */}
      <PatientDetailsModal
        patient={selectedPatient}
        open={detailsOpen}
        onClose={handleCloseDetails}
      />
    </div>
  );
}

export default PatientsPage;