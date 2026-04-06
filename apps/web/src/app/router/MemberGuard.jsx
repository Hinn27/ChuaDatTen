import { Navigate, useParams } from 'react-router-dom'
import { getSafeMember, isValidMember } from './routePaths.js'

/**
 * Bảo vệ route theo member namespace (a-e).
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function MemberGuard({ children }) {
  const { member } = useParams()

  if (!isValidMember(member)) {
    return <Navigate to={`/${getSafeMember(member)}/shop`} replace />
  }

  return children
}
