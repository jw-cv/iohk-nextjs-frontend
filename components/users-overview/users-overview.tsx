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
  const { data, selectedGender, setSelectedGender, selectedDateRange, setSelectedDateRange } = useUserContext();

  const filteredData = useMemo(() => {
    return data.filter(user => {
      const genderMatch = !selectedGender || selectedGender === 'all' || user.gender === selectedGender;
      let dateMatch = true;
      const birthDate = new Date(user.birthDate);
      const birthYear = birthDate.getFullYear();

      if (selectedDateRange === 'since-2000') {
        dateMatch = birthYear >= 2000;
      } else if (selectedDateRange === '1990-1999') {
        dateMatch = birthYear >= 1990 && birthYear < 2000;
      } else if (selectedDateRange === '1980-1989') {
        dateMatch = birthYear >= 1980 && birthYear < 1990;
      } else if (selectedDateRange === 'before-1980') {
        dateMatch = birthYear < 1980;
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
      birthDate: user.birthDate,
      dependants: user.dependants,
    }));
  }, [filteredData]);

  const usersByGender = useMemo(() => {
    const genderData: { [key: string]: number } = {};
    filteredData.forEach(user => {
      genderData[user.gender] = (genderData[user.gender] || 0) + 1;
    });
    return Object.entries(genderData).map(([gender, count]) => ({ gender, count }));
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
        <Select onValueChange={setSelectedGender}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setSelectedDateRange}>
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