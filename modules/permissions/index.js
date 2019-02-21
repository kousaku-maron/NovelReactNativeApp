import { Permissions } from 'expo'

export const acceptCameraRollPermissions = async () => {
  const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL)
  if(permission.status !== 'granted') {
    const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (newPermission.status === 'granted') {
      return true
    }
    else {
      return false
    }
  }

  return true
}