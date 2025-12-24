import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, preferredDate, preferredTime, message } = body;

    // バリデーション
    if (!name || !email || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // ここで実際の予約処理を行う
    // 例: データベースに保存、メール送信など
    
    // 今は成功レスポンスを返す
    console.log('Booking request received:', {
      name,
      email,
      preferredDate,
      preferredTime,
      message,
    });

    // TODO: 実際の予約処理を実装
    // - データベースに保存
    // - 確認メールを送信
    // - カレンダーに追加など

    return NextResponse.json({
      success: true,
      message: 'Booking request received successfully',
    });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to process booking request' },
      { status: 500 }
    );
  }
}

