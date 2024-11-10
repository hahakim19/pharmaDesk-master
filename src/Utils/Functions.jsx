import { tailwindColors } from '../utils/Colors.jsx';

export function calcPercentage(defaultValue, comparedValue) {
    return Math.max(0, Math.min(1, (comparedValue * 0.5) / defaultValue));
}

export function drawCircle(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = tailwindColors.primary;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

export function drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = tailwindColors.primary;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

export function formatNumberWithComma(number) {
    return new Intl.NumberFormat('en-US').format(number);
}

export function formatDate(timeDifference) {

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    // Create an Intl.RelativeTimeFormat instance
    const rtf = new Intl.RelativeTimeFormat('fr', { numeric: 'auto' });

    // Determine the appropriate unit to display
    let formattedTime;
    if (seconds < 60) {
        formattedTime = rtf.format(-seconds, 'second');
    } else if (minutes < 60) {
        formattedTime = rtf.format(-minutes, 'minute');
    } else if (hours < 24) {
        formattedTime = rtf.format(-hours, 'hour');
    } else if (days < 7) {
        formattedTime = rtf.format(-days, 'day');
    } else {
        formattedTime = rtf.format(-weeks, 'week');
    }
    return formattedTime;
}