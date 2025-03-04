import jwt from 'jsonwebtoken'

const auth = async(request, response, next) => {
    try {
        console.log('Auth middleware starting');
        
        // First check Authorization header which is set by the axios interceptor
        const authHeader = request.headers.authorization;
        console.log('Authorization header:', authHeader || 'Not provided');
        
        // Initialize token
        let token = null;
        
        // Extract token from Authorization header if available
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
            console.log('Using token from Authorization header');
        }
        
        // Fallback to cookie if no token in header
        if (!token) {
            token = request.cookies.accessToken;
            console.log('Token from cookies:', token ? 'Found' : 'Not found');
        }
        
        if (!token) {
            console.log('No token found in request');
            return response.status(401).json({
                success: false,
                message: "Authentication required. Please login."
            });
        }

        try {
            console.log('Verifying token...');
            const decoded = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
            console.log('Token verified, user ID:', decoded.id);
            request.userId = decoded.id;
            next();
        } catch (tokenError) {
            console.error('Token verification failed:', tokenError);
            return response.status(401).json({
                success: false,
                message: "Invalid or expired token. Please login again.",
                error: true
            });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        return response.status(500).json({
            success: false,
            message: "Authentication failed. Please try again.",
            error: true
        });
    }
}

export default auth