import axios from 'axios'
import { useQuery } from "@tanstack/react-query"; 

import { Option } from '@/types/options';

export const useStates = () => {
  return useQuery({
    queryKey: ["states"],
    queryFn: async () => {
      const response = await axios.get<Option[]>(
        "http://localhost:8080/states"
      );
      return response.data.map((state) => ({
        label: state.label,
        value: state.id,
      }));
    },
  });
};

export const useLanguages = () => {
  return useQuery({
    queryKey: ["languages"],
    queryFn: async () => {
      const response = await axios.get<Option[]>(
        "http://localhost:8080/languages"
      );
      return response.data.map((state) => ({
        label: state.label,
        value: state.id,
      }));
    },
  });
};

export const useGenders = () => {
  return useQuery({
    queryKey: ["genders"],
    queryFn: async () => {
      const response = await axios.get<Option[]>(
        "http://localhost:8080/genders"
      );
      return response.data.map((state) => ({
        label: state.label,
        value: state.id,
      }));
    },
  });
};

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const response = await axios.get<Option[]>(
        "http://localhost:8080/skills"
      );
      return response.data.map((state) => ({
        label: state.label,
        value: state.id,
      }));
    },
  });
};