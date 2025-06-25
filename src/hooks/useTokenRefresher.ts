import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { refreshToken as fetchRefreshToken } from '../services/auth.api';
import { logout, refreshAccessToken } from "../redux/authSlice";


export const useTokenRefresher = () => {
    const dispatch = useDispatch();
    const { refreshToken } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (!refreshToken) return;

        const interval = setInterval(async () => {
            try {
                const response = await fetchRefreshToken(refreshToken);
                dispatch(refreshAccessToken({accessToken: response.accessToken}))
            } catch (err) {
                console.error('Refresh failed:', err);
                dispatch(logout());
            }
        }, 30 * 1000)

        return () => clearInterval(interval);
    }, [refreshToken, dispatch])
}