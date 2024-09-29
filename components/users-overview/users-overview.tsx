"use client"

import React, { useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DependantsByCountryChart } from '@/components/users-overview/charts/dependants-by-country-chart';
import { AgeGroupDistributionChart } from '@/components/users-overview/charts/age-group-distribution-chart';
import { DependantsByAgeChart } from '@/components/users-overview/charts/dependants-by-age-chart';
import { UsersByGenderChart } from '@/components/users-overview/charts/users-by-gender-chart';
import { AverageAgeByCountryChart } from '@/components/users-overview/charts/average-age-by-country-chart';
import { useUserContext } from '../users/user-context';

export function UsersOverview() {
  const { data, selectedGender, setSelectedGender, selectedDateRange, setDateRange } = useUserContext();

  const filteredData = useMemo(() => {
    return data.filter(user => {
      const genderMatch = !selectedGender || selectedGender === 'all' || user.gender.toLowerCase() === selectedGender.toLowerCase();
      let dateMatch = true;
      const birthDate = new Date(user.birthDate);

      if (selectedDateRange.start) {
        dateMatch = dateMatch && birthDate >= selectedDateRange.start;
      }
      if (selectedDateRange.end) {
        dateMatch = dateMatch && birthDate <= selectedDateRange.end;
      }

      return genderMatch && dateMatch;
    });
  }, [data, selectedGender, selectedDateRange]);

  const dependantsByCountry = useMemo(() => {
    const countryData: { [key: string]: number } = {};
    filteredData.forEach(user => {
      countryData[user.country] = (countryData[user.country] || 0) + user.dependants;
    });
    return Object.entries(countryData).map(([country, dependants]) => ({ 
      country, 
      dependants, 
    }));
  }, [filteredData]);

  const ageGroupDistribution = useMemo(() => {
    const groups: { [key: string]: number } = {};
    filteredData.forEach(user => {
      const age = new Date().getFullYear() - new Date(user.birthDate).getFullYear();
      const group = `${Math.floor(age / 5) * 5}-${Math.floor(age / 5) * 5 + 4}`;
      groups[group] = (groups[group] || 0) + 1;
    });
    return Object.entries(groups).map(([ageGroup, count]) => ({ ageGroup, count }));
  }, [filteredData]);

  const dependantsByAge = useMemo(() => {
    return filteredData.map(user => ({
      birthDate: user.birthDate, // Keep birthDate as a string
      dependants: user.dependants,
    }));
  }, [filteredData]);

  const usersByGender = useMemo(() => {
    const genderData: { [key: string]: number } = {};
    filteredData.forEach(user => {
      const gender = user.gender.toLowerCase();
      genderData[gender] = (genderData[gender] || 0) + 1;
    });
    return Object.entries(genderData).map(([gender, count]) => ({ 
      gender: gender === 'male' ? 'Male' : 'Female', 
      count 
    }));
  }, [filteredData]);

  const ageByCountry = useMemo(() => {
    const countryData: { [key: string]: { totalAge: number, count: number } } = {};
    filteredData.forEach(user => {
      const age = new Date().getFullYear() - new Date(user.birthDate).getFullYear();
      if (!countryData[user.country]) {
        countryData[user.country] = { totalAge: 0, count: 0 };
      }
      countryData[user.country].totalAge += age;
      countryData[user.country].count++;
    });
    return Object.entries(countryData).map(([country, data]) => ({ 
      country, 
      averageAge: data.count > 0 ? data.totalAge / data.count : 0,
    }));
  }, [filteredData]);

  return (
    <div className="space-y-6 py-6">
      <div className="pt-4 flex space-x-4">
        <Select value={selectedGender || undefined} onValueChange={setSelectedGender}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
        <Select 
          value={
            selectedDateRange.start && selectedDateRange.end 
              ? `${selectedDateRange.start.getFullYear()}-${selectedDateRange.end.getFullYear()}` 
              : selectedDateRange.start 
                ? `since-${selectedDateRange.start.getFullYear()}` 
                : selectedDateRange.end 
                  ? `before-${selectedDateRange.end.getFullYear() + 1}` 
                  : 'all'
          } 
          onValueChange={setDateRange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Dates</SelectItem>
            <SelectItem value="since-2000">Since 2000</SelectItem>
            <SelectItem value="1990-1999">1990-1999</SelectItem>
            <SelectItem value="1980-1989">1980-1989</SelectItem>
            <SelectItem value="before-1980">Before 1980</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DependantsByCountryChart data={dependantsByCountry} />
        <AgeGroupDistributionChart data={ageGroupDistribution} />
        <DependantsByAgeChart data={dependantsByAge} />
        <UsersByGenderChart data={usersByGender} />
        <AverageAgeByCountryChart data={ageByCountry} />
      </div>
    </div>
  );
}