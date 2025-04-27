import { Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { AnyObject } from 'src/Models/AnyObject';
import { PaginationType } from 'src/Models/PaginationType';
import { BusinessCategoryListTable } from 'src/app/components/Table/BusinessCategoryListTable';
import axiosInstance from 'src/app/services/AxiosInstance';

// Fetch all data with pagination handling
const fetchAllData = async (url: string): Promise<AnyObject[]> => {
  let allData: AnyObject[] = [];
  let pageIndex = 0;
  let hasNextPage = true;

  try {
    // Fetch data while there's more pages
    while (hasNextPage) {
      const response = await axiosInstance.get(`${url}?pageIndex=${pageIndex}&pageSize=100`);
      const responseData: PaginationType = response.data;

      allData = [...allData, ...responseData.data];
      hasNextPage = responseData.hasNextPage;
      pageIndex++;
    }

    // Sort data by SortOrder after fetching all pages
    allData.sort((a: AnyObject, b: AnyObject) => a.sortOrder - b.sortOrder);

    // Process businessTypeId to render tags
    allData.forEach((item: AnyObject) => {
      try {
        const businessTypeIds: string[] = JSON.parse(item['businessTypeId']);
        item['businessTypeId'] = businessTypeIds.map((id) => (
          <Tag color="blue" key={id}>
            {id}
          </Tag>
        ));
      } catch (error) {
        console.error('Error parsing businessTypeId:', error);
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return allData;
};

const BusinessCategoryList: React.FC = () => {
  const [allData, setAllData] = useState<AnyObject[]>([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Avoid unnecessary re-renders by only calling once when component mounts
    const fetchData = async () => {
      try {
        const fetchedData = await fetchAllData('BusinessCategory');
        console.log('Fetched Data:', fetchedData);
        setAllData(fetchedData); // Update state only once after fetching
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      {loading ? (
        <div>Loading...</div> // Show loading state while data is being fetched
      ) : (
        // Pass the fetched data to BusinessCategoryListTable
        <BusinessCategoryListTable
          api={'BusinessCategory'}
          displayData={['name', 'businessTypeId', 'isActive', 'id']}
          allData={allData} // Pass fetched data to table
        />
      )}
    </>
  );
};

export default BusinessCategoryList;
