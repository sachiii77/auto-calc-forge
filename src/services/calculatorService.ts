
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import { firestore } from '@/integrations/firebase/client';
import { Calculator } from '@/types/calculator';
import { generateCalculator } from '@/services/aiService';

const calculatorsCollection = collection(firestore, 'calculators');

export const getCalculators = async (): Promise<Calculator[]> => {
  const snapshot = await getDocs(calculatorsCollection);
  const calculators: Calculator[] = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    calculators.push({
      id: doc.id,
      templateId: data.templateId,
      name: data.name,
      description: data.description,
      createdAt: data.createdAt,
      uses: data.uses,
      // Ensure all fields from the Calculator type are mapped
    });
  });
  return calculators;
};

export const getCalculatorById = async (id: string): Promise<Calculator | null> => {
  const docRef = doc(firestore, 'calculators', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
    } as Calculator;
  } else {
    return null;
  }
};

export const createCalculator = async (description: string): Promise<Calculator> => {
  const template = await generateCalculator(description);

  if (!template) {
    throw new Error('Failed to generate calculator from template.');
  }

  const newCalculatorData = {
    templateId: template.id,
    name: template.title,
    description: template.description,
    createdAt: new Date().toISOString(),
    uses: 0,
  };

  const docRef = await addDoc(calculatorsCollection, newCalculatorData);

  return {
    id: docRef.id,
    ...newCalculatorData,
  };
};

export const deleteCalculator = async (id: string): Promise<void> => {
  const docRef = doc(firestore, 'calculators', id);
  await deleteDoc(docRef);
};
