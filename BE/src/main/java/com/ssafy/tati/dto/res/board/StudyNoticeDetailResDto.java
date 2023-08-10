package com.ssafy.tati.dto.res.board;

import com.ssafy.tati.entity.Board;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "스터디 공지사항 상세 조회 응답 DTO (스터디 공지사항 단건 상세 조회 시 사용)")
public class StudyNoticeDetailResDto {
    @Schema(description = "게시글 식별번호")
    private Integer boardId;
    @Schema(description = "게시글 제목")
    private String boardTitle;
    @Schema(description = "게시글 내용")
    private String boardContent;
    @Schema(description = "작성자 식별번호")
    private Integer memberId;
    @Schema(description = "작성자 닉네임")
    private String memberNickname;
    @Schema(description = "조회수")
    private Integer boardHit;
    @Schema(description = "작성일")
    private String createdDate;
    @Schema(description = "수정일")
    private String modifiedDate;
    @Schema(description = "대표글 여부")
    private boolean mainNoticeYn;
}