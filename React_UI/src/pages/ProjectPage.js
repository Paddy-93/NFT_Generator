import React, { useState, useEffect } from 'react'
import MyProjectCard from '../components/MyProject/MyProjectCard'
import { useParams } from 'react-router'
import { useContractRead, useAccount } from 'wagmi'
import { simpleNftJson } from '../contracts/SimpleNftJson'
import MintPortal from '../components/MyProject/MintPortal'

const ProjectPage = () => {
  const { contractId } = useParams();
  const { address } = useAccount()

  const { data } = useContractRead({
    addressOrName: contractId,
    contractInterface: simpleNftJson.abi,
    functionName: 'owner',
  })

  return (
    data === address ? <MyProjectCard/> : <MintPortal/>
  )
}

export default ProjectPage