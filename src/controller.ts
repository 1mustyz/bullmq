import { Request, Response } from "express";
import { bulkQueueProvider } from "./queue";

export const bulkArray = (req:Request, res:Response) => {
    const data = Array.from({length: 10}).map((_, index) => ({ message: `Task ${index + 1}` }))
    bulkQueueProvider.addBulk(data.map(val => ({
        data: val,
        opts: { attempts: 1 },
        name: 'bulkJob'
    })))
    res.json({msg:'processing',data})
}

export const bulkArrayWithoutWorker = async (req:Request, res:Response) => {
    const data = Array.from({length: 10}).map((_, index) => ({ message: `Task ${index + 1}` }))
    await Promise.all(data.map(async (val) => {
        // console.log(`${val.message} before processed`)
        await processJobWithoutWorket(val)
    }))
    
    res.json({msg:'done processing bulkArrayWithoutWorker'})
}


export const processJob = async (job: any) => {
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 5000));
    throw new Error('Something went wrong')
    // Process the job data
    console.log(`Processing job ${job.id}: ${job.data.message}`);
  }

const processJobWithoutWorket = async (job: any) => {
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 10000));
  
    // Process the job data
    console.log(`Processing job ${job.message}`);
  }